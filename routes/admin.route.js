const router = require('express').Router();
const adminController = require('../controllers/admin.controllers');

router.route('/admin/check')
    .get(adminController.checkAdmin);

router.route('/admin/preferences')
    .get(adminController.getPreferences);

router.route('/admin/:domain')
    .get(adminController.getDomain);

module.exports = router;