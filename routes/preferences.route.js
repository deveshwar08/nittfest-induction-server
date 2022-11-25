const router = require('express').Router();
const preferencesControllers = require('../controllers/preferences.controller');
const {requireAuth} = require("../middleware/auth.middleware");

router.route('/preferences')
    .get(requireAuth, preferencesControllers.getPreferences)
    .post(requireAuth, preferencesControllers.postPreferences);
    
module.exports = router;