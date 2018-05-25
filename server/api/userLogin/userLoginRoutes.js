var router = require('express').Router();
import logger from '../../util/logger';
import controller from './userLoginController';
const verifyUser = require('./auth').verifyUser;


router.post('/', verifyUser(), controller.signin);

module.exports = router;
