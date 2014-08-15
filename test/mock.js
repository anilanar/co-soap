'use strict';

var _ = require('lodash');

function Mock() {
  var mockError = undefined;
  var mockResult = true; //default method invocation result
  var self = this;

  self.enableError = function(val) {
    mockError = new Error(val);
  };

  self.disableError = function() {
    mockError = undefined;
  };

  self.setResult = function(res) {
    mockResult = res;
  };

  self.services = ['service1', 'service2'];
  self.ports = ['port1', 'port2'];
  self.methods = ['method1', 'method2'];

  self.mockSoap = {
    createClient: function(url, options, cb) {
      if(arguments.length === 2 || !arguments[1]) cb = options;
      cb(mockError, new MockClient());
    }
  }

  function MockClient() {
    _.forEach(self.methods, function (method) {
      this[method] = mockMethod();
    }, this);

    _.forEach(self.services, function (service) {
      this[service] = mockService();
    }, this);

    self.wsdl = 'some wsdl';
  }

  function mockService () {
    var res = {};
    _.forEach(self.ports, function (port) {
      res[port] = mockPort();
    });
    return res;
  }

  function mockPort () {
    var res = {};
    _.forEach(self.methods, function (method) {
      res[method] = mockMethod();
    });
    return res;
  }

  function mockMethod () {
    return function (args, cb) {
      cb(mockError, mockResult);
    };
  }
}

module.exports = new Mock();

