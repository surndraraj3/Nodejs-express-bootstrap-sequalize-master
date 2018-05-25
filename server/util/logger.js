// no var needed here, colors will attached colors
// to String.prototype
require('colors');
import fs from 'fs';
import moment from 'moment';

const _ = require('lodash');

const config = require('../config/config');

// create a noop (no operation) function for when loggin is disabled
const noop = function(){};
// check if loggin is enabled in the config
// if it is, then use console.log
// if not then noop
const consoleLog = config.logging ? console.log.bind(console) : noop;

const logger = {
  log: function() {
    var tag = '[ ✨ LOG ✨ ]'.green;
    // arguments is an array like object with all the passed
    // in arguments to this function
    var args = _.toArray(arguments)
      .map(function(arg) {
        if(typeof arg === 'object') {
          // turn the object to a string so we
          // can log all the properties and color it
          const string = JSON.stringify(arg, null, 2);
          return tag + '  ' + string.cyan;
        } else {
          return tag + '  ' + arg.cyan;
        }
      });

    // call either console.log or noop here
    // with the console object as the context
    // and the new colored args :)
    consoleLog.apply(console, args);
  },

  error: function() {
    const args = _.toArray(arguments)
      .map(function(arg) {
        let baseUrl = arg.baseUrl || '';
        let method = arg.method;
        arg = arg.stack || arg;
        let name = arg.name || '[ ❌ ERROR ❌ ]';
        let date = new Date();
        let n = date.toDateString();
        let time = date.toLocaleTimeString();
        let log = `${name.yellow} ${n} ${time} , Endpoint: ${baseUrl} ,method: ${method} \n ${arg.red}`;

        return log;
      });

      fs.appendFile('log.txt', `\n ${args}`, function (err) {
          if (err) 
              return console.log(err);
          console.log('Wrote Hello World in file helloworld.txt, just check it');
      });

    consoleLog.apply(console, args);
  }
};

module.exports = logger;
