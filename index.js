'use strict';

var soap = require('soap'),
    co = require('co'),
    _ = require('lodash');

module.exports = {
  ClientSSLSecurity: soap.ClientSSLSecurity,
  BasicAuthSecurity: soap.BasicAuthSecurity,
  WSSecurity: soap.WSSecurity
};

module.exports.createClient = function (url, opts) {
  return function(cb) {
    var fn = function(err, client) {
      if(err) cb(err, client);
      else {
        thunkifyAll( client);
        cb(err, client);
      }
    };

    if(opts)
      soap.createClient(url, opts, fn);
    else
      soap.createClient(url, fn);
  };
};

function thunkify (fn, client) {
  return function(args, opt) {
    return function (cb) {
      fn.call(client, args, function (err, res) {
        cb(err, res);
      }, opt);
    };
  };
}

function thunkifyAll (obj) {
  var keys = _.keys(obj);
  _.forEach(keys, function(prop) {
    if (_.isFunction(obj[prop]))
      obj[prop] = thunkify(obj[prop], obj);
    else
      thunkifyAll(obj[prop]);
  });
}

