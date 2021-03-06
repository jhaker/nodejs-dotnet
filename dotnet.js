/*
 dotnet.js
 
 copyright (c) 2016 jonathan haker
 Licensed under the MIT license.
 https://github.com/jhaker/nodejs-dotnet

*/
var program = require('commander');
var Promise = require('promise');
var parseArgs = require('minimist');
var argv = parseArgs(process.argv.slice(2));


var Dotnet = function(){
	
	program
	  .version('0.0.1')
	  .option('-c, --configuration [type]', 'Defines a configuration under which to build.')
	  .option('-r, --runtime [type]', 'Target runtime to build for [type].','')
	  .option('-f, --framework [type]', 'Compiles for a specific framework [type].','')
	  .option('-o, --output [type]', 'Directory in which to place the built binaries [type].','')
	  .option('-b, --build-base-path [type]', 'Directory in which to place temporary outputs [type].','')
	  .option('-l, --lang [type]', 'Language of the project. Defaults to C#. [type].','')
	  .option('-t, --type [type]', 'Type of the project. Valid values for C# are console, web, lib and xunittest. [type].','')
	  .option('--packages [type]', 'Specifies the directory to place the restored packages in. [type].','')
	  .option('--configfile [type]', 'The NuGet configuration file (NuGet.config) to use for the restore operation. [type].','')
	  .option('-s, --source [type]', 'Specifies a NuGet package source to use during the restore operation. [type].','')
	  .option('--ignore-failed-sources [type]', 'Only warn about failed sources if there are packages meeting version requirement. [type].','')
	  .option('-p, --project [type]', 'Specifies which project to run.  [type].','')
	  .option('--port [type]', 'Used by IDEs to specify a port number to listen for a connection. [type].','')
	  .option('--parentProcessId [type]', 'Used by IDEs to specify their process ID. Test will exit if the parent process does. [type].','')
	  .option('--no-build [type]', 'Does not build the test project prior to running it. [type].','')
	  .option('--version-suffix [type]', 'Updates the star in -* package version suffix with a specified string. [type].','')
	  .option('--native-subdirectory [type]', 'Temporary mechanism to include subdirectories from native assets of dependency packages in output. [type].','')
	  .parse(process.argv);
	 
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

	var buildExecuteCommand = function(cmd){
		return executeCommand(DotnetConstants.RUNNER_TYPE,cmd);
	}
	var onError = function(err){
		console.log('ERROR: '+err);
	};
	var _init = new Promise(function (resolve, reject) {
			resolve();
	});
	var _argBuilder = function(args){
		if(Array.isArray(args)){
			args.map(function(x,y){
				process.argv.push(x);
			});
			program.parse(process.argv);
		}
	}
	
	var _NEW = function(){
		var cmd = [DotnetConstants.COMMAND_NEW];
		if (program.lang) cmd += ' --lang ' + program.lang;
		if (program.type)  cmd += ' --type ' + program.type;
		return buildExecuteCommand(cmd);
	};
	var _RESTORE = function(){
		var cmd = [DotnetConstants.COMMAND_RESTORE];
		if (program.packages) cmd += ' --packages ' + program.packages;
		if (program.configfile)  cmd += ' --configfile ' + program.configfile;
		if (program.source) cmd += ' --source ' + program.source;
		if (program.ignoreFailedSources)  cmd += ' --ignore-failed-sources ' + program.ignoreFailedSources;
		return buildExecuteCommand(cmd);
	};
	var _RUN = function(){
		var cmd = [DotnetConstants.COMMAND_RUN];
		if (program.configuration) cmd += ' --configuration ' + program.configuration;
		if (program.framework)  cmd += ' --framework ' + program.framework;
		if (program.project)  cmd += ' --project ' + program.project;
		return buildExecuteCommand(cmd);
	};
	var _BUILD = function(){
		var cmd = [DotnetConstants.COMMAND_BUILD];
		if (program.configuration) cmd += ' --configuration ' + program.configuration;
		if (program.runtime)  cmd += ' --runtime ' + program.runtime;
		if (program.framework)  cmd += ' --framework ' + program.framework;
		if (program.output)  cmd += ' --output ' + program.output;
		if (program.buildBasePath)  cmd += ' --build-base-path ' + program.buildBasePath;
		return buildExecuteCommand(cmd);
	};
	var _TEST = function(){
		var cmd = [DotnetConstants.COMMAND_TEST];
		if (program.configuration) cmd += ' --configuration ' + program.configuration;
		if (program.runtime)  cmd += ' --runtime ' + program.runtime;
		if (program.framework)  cmd += ' --framework ' + program.framework;
		if (program.project)  cmd += ' --project ' + program.project;
		if (program.output)  cmd += ' --output ' + program.output;
		if (program.buildBasePath)  cmd += ' --build-base-path ' + program.buildBasePath;
		if (program.port)  cmd += ' --port ' + program.port;
		if (program.parentProcessId)  cmd += ' --parentProcessId ' + program.parentProcessId;
		if (program.noBuild)  cmd += ' --no-build ' + program.noBuild;
		return buildExecuteCommand(cmd);
	};
	var _PUBLISH = function(){
		var cmd = [DotnetConstants.COMMAND_PUBLISH];
		if (program.configuration) cmd += ' --configuration ' + program.configuration;
		if (program.runtime)  cmd += ' --runtime ' + program.runtime;
		if (program.output)  cmd += ' --output ' + program.output;
		if (program.buildBasePath)  cmd += ' --build-base-path ' + program.buildBasePath;
		if (program.noBuild)  cmd += ' --no-build ' + program.noBuild;
		if (program.versionSuffix)  cmd += ' --version-suffix ' + program.versionSuffix;
		if (program.nativeSubdirectory)  cmd += ' --native-subdirectory ' + program.nativeSubdirectory;
		return buildExecuteCommand(cmd);
	};
	var _PACK = function(){
		var cmd = [DotnetConstants.COMMAND_PACK];
		if (program.configuration) cmd += ' --configuration ' + program.configuration;
		if (program.output)  cmd += ' --output ' + program.output;
		if (program.buildBasePath)  cmd += ' --build-base-path ' + program.buildBasePath;
		if (program.noBuild)  cmd += ' --no-build ' + program.noBuild;
		if (program.versionSuffix)  cmd += ' --version-suffix ' + program.versionSuffix;
		return buildExecuteCommand(cmd);
	};
	
	var _cmds = [];
	var _new = function(args){
		_argBuilder(args);
		_cmds.push(_NEW);
		return this;
	}
	var _restore = function(args){
		_argBuilder(args);
		_cmds.push(_RESTORE);
		return this;
	}
	var _run = function(args){
		_argBuilder(args);
		_cmds.push(_RUN);
		return this;
	}
	var _build = function(args){
		_argBuilder(args);
		_cmds.push(_BUILD);
		return this;
	}
	var _test = function(args){
		_argBuilder(args);
		_cmds.push(_TEST);
		return this;
	}
	var _publish = function(args){
		_argBuilder(args);
		_cmds.push(_PUBLISH);
		return this;
	}
	var _pack = function(args){
		_argBuilder(args);
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



