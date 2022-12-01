const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const db = require("../models/index");
module.exports = {
    getQuestions: async (req, res) => {
        try {
            const token = req.cookies.auth_token;
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.user_email;
            const user = await db.users.findOne({ where: { email: email } });
            if (!user) {
                res.status(401).json({
                    message: "User not found"
                })
            }
            const domain = await db.domains.findOne({ where: { domain: req.query.domain } });
            const questions = await db.questions.findAll({ where: { domain_id: domain.id } });
            const answers = Promise.all(questions.map(async (ques) => {
                const ans = await db.answers.findOne({ where: { question_id: ques.id, user_id: user.id } });
                return ans;
            }));
            const responseAnswers = await answers;
            res.status(200).json({
                questions: questions,
                answers: responseAnswers,
            });
        } catch (err) {
            logger.error("/get Questions failed with error ", err.Message);
            res.status(403).json({ message: "Could not fetch questions" });
        }
    },
    postQuestions: async (req, res) => {
        try {
            const token = req.cookies.auth_token;
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.user_email;
            const user = await db.users.findOne({ where: { email: email } });
            if (!user) {
                res.status(401).json({
                    message: "User not found"
                })
            }
            const userAnswers = req.body.body['answers'];
            const domain = await db.domains.findOne({ where: { domain: req.body.body['domain'] } });
            const questions = await db.questions.findAll({ where: { domain_id: domain.id }});
            questions.forEach(async (ques) => {
                for(let i = 0;i < userAnswers.length; i++){
                    if(userAnswers[i].question_id == ques.id){
                        const ans = await db.answers.findOne({ where: { question_id: ques.id, user_id: user.id}});
                        if(ans){
                            ans.update({
                                answer: userAnswers[i].answer
                            });
                        } else {
                            const answer = await db.answers.create({
                                domain_id: domain.id,
                                user_id: user.id,
                                question_id: userAnswers[i].question_id,
                                answer: userAnswers[i].answer
                            });
                        }

                    }
                }
            });
            const responseQuestions = await db.questions.findAll({ where: { domain_id: domain.id } });
            const retrievedAnswers = Promise.all(questions.map(async (ques) => {
                const ans = await db.answers.findOne({ where: { question_id: ques.id, user_id: user.id } });
                return ans;
            }));
            const responseAnswers = await retrievedAnswers;
            res.status(200).json({
                message: "Answers updated successfully",
                answers: responseAnswers,
                questions: responseQuestions
            })
        } catch (err) {
            logger.error("/post Answers failed with error ", err.Message);
            res.status(403).json({ message: "Answer update failed. Try again" });
        }
    }
};