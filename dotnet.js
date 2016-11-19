/*
 dotnet.js
 
 copyright (c) 2016 jonathan haker
 Licensed under the MIT license.
 https://github.com/jhaker/nodejs-dotnet

*/

var Promise = require('promise');
var parseArgs = require('minimist');
var argv = parseArgs(process.argv.slice(2));


var Dotnet = function(){
	var executeCommand = function(cmd,args){
		var command = (cmd + ' ' + args);	
		console.log(command + ' starting');
		var exec = require('child_process').exec;
		
		return new Promise(function (resolve, reject) {
			exec(command,null,function(error,stdout,stderr){
					return error
						? reject(stderr)
						: resolve(stdout);
				});
		});
	}
	 
	var DotnetConstants = (function(){
		return {
			RUNNER_TYPE : 'dotnet',
			COMMAND_NEW : "new",
			COMMAND_RESTORE : "restore",
			COMMAND_RUN : "run",
			COMMAND_BUILD : "build",
			COMMAND_TEST : "test",
			COMMAND_PUBLISH : "publish",
			COMMAND_PACK : "pack"
		}
	})();

	var buildExecuteCommand = function(cmd){
		return executeCommand(DotnetConstants.RUNNER_TYPE,cmd);
	}
	var _NEW = function(){
		return buildExecuteCommand([DotnetConstants.COMMAND_NEW]);
	};
	var _RESTORE = function(){
		return buildExecuteCommand([DotnetConstants.COMMAND_RESTORE]);
	};
	var _RUN = function(){
		return buildExecuteCommand([DotnetConstants.COMMAND_RUN]);
	};
	var _BUILD = function(){
		return buildExecuteCommand([DotnetConstants.COMMAND_BUILD]);
	};
	var _TEST = function(){
		return buildExecuteCommand([DotnetConstants.COMMAND_TEST]);
	};
	var _PUBLISH = function(){
		return buildExecuteCommand([DotnetConstants.COMMAND_PUBLISH]);
	};
	var _PACK = function(){
		return buildExecuteCommand([DotnetConstants.COMMAND_PACK]);
	};
	var onError = function(err){
		console.log('ERROR: '+err);
	};
	var _init = new Promise(function (resolve, reject) {
			resolve();
	});

	
	var _cmds = [];
	var _new = function(){
		_cmds.push(_NEW);
		return this;
	}
	var _restore = function(){
		_cmds.push(_RESTORE);
		return this;
	}
	var _run = function(){
		_cmds.push(_RUN);
		return this;
	}
	var _build = function(){
		_cmds.push(_BUILD);
		return this;
	}
	var _test = function(){
		_cmds.push(_TEST);
		return this;
	}
	var _publish = function(){
		_cmds.push(_PUBLISH);
		return this;
	}
	var _pack = function(){
		_cmds.push(_PACK);
		return this;
	}
	/*deprecated*/
	var _start = function(){
		console.log('dotnet.start is deprecated');
	}
	var _mapArgs = function(x,y){
		if(x === 'new'){
			_new();
		}
		if(x === 'restore'){
			_restore();
		}
		if(x === 'run'){
			_run();
		}
		if(x === 'build'){
			_build();
		}
		if(x === 'test'){
			_test();
		}
		if(x === 'publish'){
			_publish();
		}
		if(x === 'pack'){
			_pack();
		}
	}
	var _series = function(){
		_cmds = [];
		var args = arguments[0];
		if(!Array.isArray(args)){
			console.log('error: no elements in series');
			return;
		}
		args.map(_mapArgs);
		return;
	}
	
	var _constructor = function(){
		var args = arguments[0];
		if(Array.isArray(args)){
			argv = Object.assign(argv, parseArgs(args));
		} else{
			args = args.args;
			if(args != 'undefined'){
				argv = Object.assign(argv, parseArgs(args));
			}
		}
		argv._.map(_mapArgs);
		return;
	}	
		
	setTimeout(function(){
		_cmds.reduce(function(chain,fn){
				return chain.then(fn);
			},_init).done();
	},300);
	

(function(){
	_constructor.apply(this,
	[{'args':process.argv.slice(2)}]
	)})();
	
	return {
		constructor : _constructor,
		start:_start,
		new : _new,
		restore: _restore,
		run: _run,
		build: _build,
		test: _test,
		publish: _publish,
		pack: _pack,
		series : _series
	}
}

var dn = new Dotnet();

module.exports = dn;
module.exports.argv = argv;



