const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const db = require("../models/index");
module.exports = {
    getQuestions: async (req, res) => {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.email;
            const user = await db.users.findOne({ where: { email: email } });
            if (!user) {
                res.status(401).json({
                    message: "User not found"
                })
            }
            const questions = await db.questions.findAll({ where: { domain_id: req.body.domain } });
            const answers = await db.answers.findAll({ where: { domain_id: req.body.domain, userId: user.id } });
            res.status(200).json({
                questions: questions,
                answers: answers
            });
        } catch (err) {
            logger.error("/get Questions failed with error ", err.Message);
            res.status(403).json({ message: "Could not fetch questions" });
        }
    },
    postQuestions: async (req, res) => {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.email;
            const user = await db.users.findOne({ where: { email: email } });
            if (!user) {
                res.status(401).json({
                    message: "User not found"
                })
            }
            const userAnswers = req.body.answers;
            const domain = await db.domains.findOne({ where: { domain: req.body.domain } });
            const retrievedAnswers = await db.answers.findAll({ where: { domain_id: domain.id, user_id: user.id, } });
            if (retrievedAnswers.length == 0) {
                for (const ans in userAnswers) {
                    const answer = await db.answers.create({
                        domain_id: domain.id,
                        user_id: user.id,
                        question_id: ans.question_id,
                        answer: ans.answer
                    });
                }
            } else {
                for (const ans in userAnswers) {
                    const retrievedAns = await db.answers.findOne({ where: { domain_id: domain.id, user_id: user.id, question_id: ans.questionId } });
                    if (!retrievedAns) {
                        const answer = await db.answers.create({
                            domain_id: domain.id,
                            user_id: user.id,
                            question_id: ans.question_id,
                            answer: ans.answer
                        });
                    } else {
                        retrievedAns.answer = userAnswers.answer;
                        retrievedAns.save();
                    }
                }
            }
            const questions = await db.questions.findAll({ where: { domain_id: req.body.domain } });
            const answers = await db.answers.findAll({ where: { domain_id: req.body.domain, user_id: user.id, } });
            res.status(200).json({
                message: "Answers updated successfully",
                answers: answers,
                questions: questions
            })
        } catch (err) {
            logger.error("/post Answers failed with error ", err.Message);
            res.status(403).json({ message: "Answer update failed. Try again" });
        }
    }
};