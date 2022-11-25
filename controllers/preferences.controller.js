const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const db = require("../models/index");
module.exports = {
    getPreferences: async (req, res) => {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.email;
            const user = await db.users.findOne({ where: { email: email } });
            if (!user) {
                res.status(401).json({
                    message: "User not found"
                })
            }
            const preferences = await db.preferences.findAll({ where: { user_id: user.id } });
            res.status(200).json({
                preferences: preferences
            });
        } catch (err) {
            logger.error("/get Preferences failed with error ", err.Message);
            res.status(403).json({ message: "Could not fetch preferences" });
        }
    },
    postPreferences: async (req, res) => {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.email;
            const user = await db.users.findOne({ where: { email: email } });
            if (!user) {
                res.status(401).json({
                    message: "User not found"
                })
            }
            const userPreferences = req.body.preferences;
            for (const pref in userPreferences) {
                const domain = await db.domains.findOne({ where: { domain_id: pref.domain } });
                const retrievedPref = await db.preferences.findOne({ where: { domain_id: domain.id, user_id: user.id } });
                retrievedPref.preference_no = pref.preference_no;
                retrievedPref.save();
            }
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