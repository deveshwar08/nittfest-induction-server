const router = require('express').Router();
const authControllers = require('../controllers/auth.controller');
router.route('/auth/callback/')
    .post(authControllers.dauthCallback);

module.exports = router;