var router = require('express').Router();
import logger from '../../util/logger';
import controller from './testController';


router.route('/')
.get(controller.get)
.post(controller.post)
.put(controller.put)
.delete(controller.delete)

router.route('/:id')
.get(controller.getOne)

module.exports = router;
