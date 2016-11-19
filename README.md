# dotnet

New. Restore. Run. Build. Test. Publish. Pack. 




``` js
var dotnet = require('dotnet');
dotnet.new();
```



# install

With [npm](https://www.npmjs.com/) do:

```
npm install dotnet
```

With [bower](https://bower.io) do:

```
bower install dotnet
```



# examples
### Running single command
```
require('dotnet').new();
```



### Running multiple commands - method chaining
```
var dotnet = require('dotnet');
dotnet.new().restore().build().publish();
```

### Running multiple commands - series

```
var dotnet = require('dotnet');
dotnet.series(['new','restore','build','publish']);
```

