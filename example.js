var cosoap = require('./'),
    co = require('co');

co(function* (){
  var client = yield cosoap.createClient('http://www.dneonline.com/calculator.asmx?WSDL');
  var response = yield client.Add({intA: 5, intB: 10});

  // prints 15
  console.log(response.AddResult);
})();
 
