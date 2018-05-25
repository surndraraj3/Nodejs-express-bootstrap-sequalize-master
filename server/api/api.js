var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/userlogin', require('./userLogin/userLoginRoutes'));

module.exports = router;
