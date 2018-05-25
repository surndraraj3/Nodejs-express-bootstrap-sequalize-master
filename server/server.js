import express from 'express';
const app = express();
import api from './api/api'
import config from './config/config'
import logger from './util/logger'
import { connectDB } from './Db';
const path = require('path');

app.use('/public', express.static(path.join(__dirname + '/public')));

// setup the app middlware
require('./middleware/appMiddlware')(app);

// setup the api

app.use('/rest', api);
// set up global error handling

app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  err.baseUrl = req.originalUrl;
  err.method = req.method;

  logger.error(err);
  if (err.name === 'RequestError') {
    res.status(400).send({message: 'Request unsuccessful please contact the admin.'});
    return;
  }

  // logger.error(err.stack);
  res.status(500).send('Oops');
});

// export the app for testing
module.exports = app;
