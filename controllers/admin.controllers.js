const db = require("../models/index");
const { convertArrayToCSV } = require('convert-array-to-csv');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require("path");

const get_answers = async (questions, user) => {
    const userDetails = [user.name, user.email, user.mobile_number];
    const answerPromise = Promise.all(questions.map(async (ques) => {
        const ans = await db.answers.findOne({ where: { question_id: ques.id, user_id: user.id } });
        return ans ? ans.answer : "";
    }));
    const answers = await answerPromise;
    return [...userDetails, ...answers];
}

const getResponses = async (domain_id) => {
    const users = await db.users.findAll();
    const user_resp = Promise.all(users.map(async (user) => {
        const questions = await db.questions.findAll({ where: { domain_id: domain_id } });
        const ans = await get_answers(questions, user);
        return ans;
    }));
    const result = await user_resp;
    return result;
}

const getPreferences = async (req, res) => {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const email = decodedToken.user_email;
        const roll = email.split("@")[0];
        if (roll == 106120029 || roll == 103120011 || roll == 103120021 || rol == 103120117) {
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
                const csvFromArrayOfArrays = convertArrayToCSV(preference, {
                    separator: ';'
                });
                await fs.writeFile(path.join(__dirname, '..', '/downloads/preferences.csv'), csvFromArrayOfArrays, err => {
                    console.log(err);
                    res.status(200).sendFile(path.join(__dirname, '..', '/downloads/preferences.csv'));
                });
            } catch (err) {
                res.status(500).send("Internal Server Error");
            }
        }
    } catch (err) {
        res.status(401).send("Unauthorized");
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
            const header = ["Name", "Email", "Mobile No", ...questions];
            const answers = await getResponses(domain.id);
            answers.unshift(header);
            try {
                const csvFromArrayOfArrays = convertArrayToCSV(answers, {
                    separator: ';'
                });
                await fs.writeFile(path.join(__dirname, '..', `/downloads/${domain.domain}.csv`), csvFromArrayOfArrays, err => {
                    console.log(err);
                    res.status(200).sendFile(path.join(__dirname, '..', `/downloads/${domain.domain}.csv`));
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (err) {
        res.status(401).send("Unauthorized");
    }
}

const checkAdmin = async (req, res) => {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const email = decodedToken.user_email;
        const roll = email.split("@")[0];
        if (roll == 106120029 || roll == 103120011 || roll == 103120021 || rol == 103120117) {
            res.status(200).send("Admin");
        }
        res.status(401).send("Unauthorized");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { getPreferences, getDomain, checkAdmin };