/*
 dotnet.js
 
 copyright (c) 2016 jonathan haker
 Licensed under the MIT license.
 https://github.com/jhaker/nodejs-dotnet

*/


var Dotnet = module.exports = function (options, cursor) {

	var platform = require('os').platform();
	var exec = require('child_process').exec;
	var config = require('./config');


	/*  default options  */
	var cmd = 'dotnet';
	var args = [];
	var options = {};


	/*  configure  */
	config.platform = platform;
	config.command = 'dotnet';
	config.args = args;

	
	/*  exec  */
	var processExec = function(cmd,args,callback){	
		cmd = (cmd + ' ' + args);	
		exec(cmd,
			function(error,stdout,stderr){
				if(error){
					console.error('error');
					console.error(error);
					return callback(error);
				}
				console.log(stdout);
				return callback(null,'success');
			}
		);
	}

	var callback = function(error,data,callback){
		if(error){
			console.error('has error');
			console.error(error);
		}	
		console.info(data);
		if(callback && isFunction(callback)){
			return callback();
		} else{
			if(callback){
				console.log(callback);
			}
			return done();
		}
	}

	var cmdexists = function(cmd,callback){
		var isUsingWindows = process.platform == 'win32'
		var cmdUnix = function(cmd, callback) {
		  var child = exec('command -v ' + cmd +
				' 2>/dev/null && { echo >&1 \'' + 
				cmd + ' found\'; exit 0; }',
				function (error, stdout, stderr) {
					return callback(null, !!stdout);
				});
		}
		var cmdWindows = function function_name(cmd, callback) {
		  var child = exec('where ' + cmd,
			function (error) {
			  if (error !== null){
				return callback('*** error missing ' + cmd, false);
			  } else {
				return callback(null, true);
			  }
			}
		  )
		}
		if (isUsingWindows) {
			cmdWindows(cmd, callback)
		} else {
			cmdUnix(cmd, callback)
		}
	}

	var done = function(){
		console.log('done');
		return;
	}

	var execute = function(error,hasDotnet){
		if(error){
			console.error(error);
		}

		if(hasDotnet && error == null){	
			return processExec(cmd,args,callback);
		} else {
			console.info('.NET Core and dotnet build tool can be found online https://www.microsoft.com/net/core');
			return;
		}
	}

	var _constructor = function(){
		config.args = Object.assign(config.args,arguments[0]).args;
	}

	var _start = function(callback){
		if(!callback ){
			callback = done;
		}
		if(callback && !isFunction(callback)){
			callback = done;
		}

		if(!config.args || config.args.length == 0){
			console.error('error missing args. example dotnet.constructor({args:[\'new\']});');
			config.args.push('-h');
		} else{
			console.error(config.args);
		}
		
		return processExec(config.command, config.args, callback);
	}

	var _new = function(error, data, callback){
		_constructor({args:['new']});
		return _start(callback);
	}

	var _restore = function(error, data, callback){
		_constructor({args:['restore']});
		return _start(callback);
	}

	var _pack = function(error, data, callback){
		_constructor({args:['pack']});
		return _start(callback);
	}
	
	var _run = function(error, data, callback){
		_constructor({args:['run']});
		return _start(callback);
	}

	return {
		constructor : _constructor,
		args : config.args,
		start : _start,
		new : _new, 
		restore : _restore, 
		pack : _pack,
		run : _run
	};
}


/*  utils  */
var isFunction = function(x) {
  return Object.prototype.toString.call(x) == '[object Function]';
}


/*  polyfills  */
/*  assign polyfill - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign */
if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      // We must check against these specific cases.
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}