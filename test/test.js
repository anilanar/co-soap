'use strict';

require('co-mocha');

var proxyquire = require('proxyquire'),
    mock = require('./mock'),
    should = require('chai').should();
    
var cosoap = proxyquire('../', {'soap': mock.mockSoap});

// hack for should.Throw support for co-mocha
should.throw = function *(gen) {
  var exception;
  try {
    yield gen;
  } catch(err) {
    exception = err;
  }
  
  (function () { if(exception) throw exception; }).should.throw(Error);
};

console.log(should.Throw.toString());

describe('co-soap', function () {
  var errMsg = 'err';
  var expRes = {};
  mock.setResult(expRes);

  describe('when it cannot create client', function () {
    it('should throw exception', function* () {
      mock.enableError(errMsg);
      yield should.throw(function* () {
        yield cosoap.createClient('');
      });
      mock.disableError();
    });
  });

  describe('when it can create clients', function () { 
    it('should return client', function* () {
      var client = yield cosoap.createClient('');
      client.constructor.name.should.be.eql('MockClient');
    });

    describe('when options are provided to create client', function () {
      it('should return client', function* () {
        var client = yield cosoap.createClient('', {someOption: 1});
        client.constructor.name.should.be.eql('MockClient');
      });
    }); 

    describe('when methods cannot be invocated', function () {
      it('should throw exception', function* (done) {
        var client = yield cosoap.createClient('');
        mock.enableError(errMsg);
        yield should.throw(function* () {
          yield testMethods(client);
        });
        mock.disableError();
      });
    });

    describe('when methods can be invocated', function () {
      it('should return result', function* () {
        var client = yield cosoap.createClient('');
        yield testMethods(client);
      });

      it('should return result on a specific service and port', function* () {
        var client = yield cosoap.createClient('');
        for(var i = 0; i < mock.services; i++) {
          for(var j = 0; j < mock.ports; j++) {
            yield testMethods(client[mock.services[i]][mock.ports[j]]);
          }
        }
      });
    });

    function* testMethods(obj) {
      for(var i = 0; i < mock.methods.length; i++) {
        var res = yield obj[mock.methods[i]]({});
        res.should.be.eql(expRes);
      }
    }
  });
}); 
  






