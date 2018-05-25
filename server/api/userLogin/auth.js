const User = require('../../models').User;
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const checkToken = expressJwt({ secret: config.secrets.jwt });
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _ from 'lodash';

exports.decodeToken = function() {
  return function(req, res, next) {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    const authorizationHeader = req.headers['authorization'];
    console.log(`authorizationHeader -> ${authorizationHeader}`);
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }

    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.user
    checkToken(req, res, next);
  };
};

exports.verifyUser = function() {
  return function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    // if no username or password then send
    if (!username || !password) {
        res.send({
            dbData: {
              "message":'You need a username and password'       
            }
          });
    }
    User
    .find({
      where: {
        username: username,
        password: password
      }
    })
    .then(user => {
      if (!user) {
        res.send({
          dbData: {
            "message":"Invalid UserName And Password."       
          }
        });
      }

      req.user = user;
      next();
    })
    .catch(error => next(error));
  };
};

// util method to sign tokens on signup
exports.signToken = function(id) {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt
  );
};
