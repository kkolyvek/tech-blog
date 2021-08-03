const router = require('express').Router();
const renderRoutes = require('./renderRoutes/renderRoutes.js');
const apiRoutes = require('./apiRoutes/apiRoutes.js');

router.use('/', renderRoutes);
router.use('/api', apiRoutes);

module.exports = router;