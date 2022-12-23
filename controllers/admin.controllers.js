const db = require("../models/index");
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require("path");
const XlsxPopulate = require('xlsx-populate2');

const getAnswers = async (questions, user) => {
    const answerPromise = Promise.all(questions.map(async (ques) => {
        const answer = await db.answers.findOne({ where: { question_id: ques.id, user_id: user.id } });
        return answer ? answer.answer : "";
    }));
    const answers = await answerPromise;
    return [...answers];
}

const getResponses = async (domain_id) => {
    const users = await db.users.findAll();
    const userResponsePromise = Promise.all(users.map(async (user) => {
        const questions = await db.questions.findAll({ where: { domain_id: domain_id } });
        const preference = await db.preferences.findOne({ where: { domain_id: domain_id, user_id: user.id } });
        const ans = await getAnswers(questions, user);
        let userDetails = [];
        if (preference) {
            userDetails = [user.name, user.email, user.mobile_number, preference.preference_no];
        } else {
            userDetails = [user.name, user.email, user.mobile_number, "No preference selected"];
        }
        return [...userDetails, ...ans];
    }));
    const userResponse = await userResponsePromise;
    return userResponse;
}

const getPreferences = async (req, res) => {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const email = decodedToken.user_email;
        const roll = email.split("@")[0];
        if (roll == 106120029 || roll == 103120011 || roll == 103120021 || roll == 103120117) {
            const users = await db.users.findAll();
            const user_pref = Promise.all(users.map(async (user) => {
                let preferences = await db.preferences.findAll({ where: { user_id: user.id } });
                preferences.sort((a, b) => a.preference_no > b.preference_no);
                const pref = Promise.all(preferences.map(async preference => {
                    const domain = await db.domains.findOne({ where: { id: preference.domain_id } });
                    return domain.domain;
                }));
                const pre = await pref;
                return [user.name, user.email, user.mobile_number, ...pre];
            }));
            const preference = await user_pref;
            const header = ["Name", "Email", "Mobile No", "Preference 1", "Preference 2", "Preference 3", "Preference 4", "Preference 5", "Preference 6"];
            preference.unshift(header);
            try {
                XlsxPopulate.fromBlankAsync()
                    .then(workbook => {
                        // Modify the workbook.
                        workbook.sheet(0).cell("A1").value(preference);
                        // Write to file.
                        return workbook.toFileAsync(path.join(__dirname, '..', "/downloads/preference.xlsx")).then(() => res.status(200).
                            sendFile(path.join(__dirname, '..', "/downloads/preference.xlsx")));
                    });
            } catch (err) {
                res.status(500).send("Error writing file");
            }
        }
        else res.status(401).send("Unauthorized")
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

const getDomain = async (req, res) => {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const email = decodedToken.user_email;
        const roll = email.split("@")[0];
        if (roll == 106120029 || roll == 103120011 || roll == 103120021 || roll == 103120117) {
            const domainName = req.params['domain'];
            const domain = await db.domains.findOne({ where: { domain: domainName } });
            const ques = await db.questions.findAll({ where: { domain_id: domain.id } });
            const questionsPromise = Promise.all(ques.map(async (q) => {
                return q.question;
            }));
            const questions = await questionsPromise;
            const header = ["Name", "Email", "Mobile No", "Preference Number", ...questions];
            const answers = await getResponses(domain.id);
            answers.unshift(header);
            try {
                XlsxPopulate.fromBlankAsync()
                    .then(workbook => {
                        // Modify the workbook.
                        workbook.sheet(0).cell("A1").value(answers);
                        // Write to file.
                        return workbook.toFileAsync(path.join(__dirname, '..', `/downloads/${domain.domain}.xlsx`)).then(() => res.status(200).
                            sendFile(path.join(__dirname, '..', `/downloads/${domain.domain}.xlsx`)));
                    });
            } catch (err) {
                res.status(500).send("Error writing file");
            }
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

const checkAdmin = async (req, res) => {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const email = decodedToken.user_email;
        const roll = email.split("@")[0];
        if (roll == 106120029 || roll == 103120011 || roll == 103120021 || roll == 103120117) {
            res.status(200).send("Admin");
        }
        else res.status(401).send("Unauthorized");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { getPreferences, getDomain, checkAdmin };