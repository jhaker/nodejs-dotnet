# dotnet

Build. Restore. Run. Pack. 




``` js
var dotnet = require('dotnet')();
dotnet.constructor({args:['new']});
dotnet.start();
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

### New
```
var dotnet = require('dotnet')();
dotnet.constructor({args:['new']});
dotnet.start();
```

OR

```
require('dotnet')().new();
```



### Pack
```
var dotnet = require('dotnet')();
dotnet.constructor({args:['pack']});
dotnet.start();
```

OR

```
require('dotnet')().pack();
```