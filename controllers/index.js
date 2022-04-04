const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeroutes');
const dashRoutes = require('./dashroutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dash', dashRoutes);

module.exports = router;