[![Build Status](https://travis-ci.org/anilanar/co-soap.svg?branch=master)](https://travis-ci.org/anilanar/co-soap) [![Coverage Status](https://coveralls.io/repos/anilanar/co-soap/badge.png?branch=master)](https://coveralls.io/r/anilanar/co-soap?branch=master)
[![NPM version](https://badge.fury.io/js/co-soap.svg)](http://badge.fury.io/js/co-soap)

#co-soap

[co](https://github.com/visionmedia/co) friendly wrapper around [Soap](https://github.com/vpulim/node-soap) client.

## Disclaimer

[Soap](https://github.com/vpulim/node-soap) is far from being bug free and it is not well maintained. If you encounter bugs/problems, you are welcome to report them here. However it is highly recommended that you check [Soap issues]((https://github.com/vpulim/node-soap/issues) beforehand if there are issues similar to yours. **co-soap** will not be endeavouring to fix bugs related to [Soap](https://github.com/vpulim/node-soap).

## Installation

```js
$ npm install co-soap
```

## Example

```js
var cosoap = require('co-soap'),
    co = require('co');

co(function* (){
  var client = yield cosoap.createClient('http://www.dneonline.com/calculator.asmx?WSDL');
  var response = yield client.Add({intA: 5, intB: 10});

  // prints 15
  console.log(response.AddResult);
})();
```

## API
Please see [Soap Github page](https://github.com/vpulim/node-soap) for API details.

## License
MIT