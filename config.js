
var config = module.exports = {};
/*  defaults  */
config.options = {};
config.options.values = (function(){
		var _values = ['--verbose','--help','--lang','--type'];
		var total = _values.length;
		for(var i = 0; i < total; i++){
			_values.push(_values[i].substring(1,3));
		}
		_values.push('--info');
		_values.push('--version');
		return _values;
	})();
config.options.langs = ['C#','F#','csharp','fsharp','cs','fs' ];
config.options.types = {};
config.options.types.CSharp = ['console','web','lib','xunittest'];
config.options.types.FSharp = ['console'];
config.options.types['C#'] = config.options.CSharp;
config.options.types['F#'] = config.options.FSharp;
config.options.types['cs'] = config.options.CSharp;
config.options.types['fs'] = config.options.FSharp;
config.options.types['csharp'] = config.options.CSharp;
config.options.types['fsharp'] = config.options.FSharp;


