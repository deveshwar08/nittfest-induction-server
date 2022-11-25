const router = require('express').Router();
const questionsControllers = require('../controllers/questions.controller');
const {requireAuth} = require("../middleware/auth.middleware");

router.route('/form_questions')
    .get(requireAuth, questionsControllers.getQuestions)
    .post(requireAuth, questionsControllers.postQuestions);
    
module.exports = router;