const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const db = require("../models/index");
module.exports = {
    getPreferences: async (req, res) => {
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
            const preferences = await db.preferences.findAll({ where: { user_id: user.id } });
            preferences.sort((a, b) => {
                return a.preference_no - b.preference_no;
            });
            const prefs = Promise.all(preferences.map(async pref => {
                const domain = await db.domains.findOne({ where: { id: pref.domain_id } });
                return domain.domain;
            }));
            const response = await prefs;
            res.status(200).json({
                preferences: response
            });
        } catch (err) {
            logger.error("/get Preferences failed with error ", err.Message);
            res.status(403).json({ message: "Could not fetch preferences" });
        }
    },
    postPreferences: async (req, res) => {
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
            const userPreferences = req.body.preferences;
            userPreferences.forEach(async (pref) => {
                const domain = await db.domains.findOne({ where: { domain: pref.domain } });
                const retrievedPref = await db.preferences.findOne({ where: { domain_id: domain.id, user_id: user.id } });
                if (!retrievedPref) {
                    const newPref = await db.preferences.create({
                        domain_id: domain.id,
                        preference_no: pref.preference_no,
                        user_id: user.id
                    });
                } else {
                    retrievedPref.preference_no = pref.preference_no;
                    retrievedPref.save();
                }
            });
            const preferences = await db.preferences.findAll({ where: { user_id: user.id } });
            res.status(200).json({
                message: "Preference updated successfully",
                preferences: preferences
            })
        } catch (err) {
            logger.error("/post Preferences failed with error ", err.Message);
            res.status(403).json({ message: "Preference update failed. Try again" });
        }
    }
};