const jwt = require('jsonwebtoken');
const axios = require('axios');
const db = require("../models/index");
const logger = require('../utils/logger');

module.exports = {
    signJWT: (user_name, user_email) => {
        logger.debug(`Signing JWT for ${user_email}`);
        const payload = {
            "user_email": user_email,
            "user_name": user_name,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    },
    getDepartmentId: (email) => {
        if (email[0] == 1)
            return email.substring(1, 3);
        if (email[0] == 2)
            return 15;
        if (email[0] == 3 || email[0] == 4)
            return 16;

        return 1;
    },
    dauthCallback: async (req, response) => {
        try {
            const params = new URLSearchParams();
            params.append("client_id", process.env.CLIENT_ID);
            params.append("client_secret", process.env.CLIENT_SECRET);
            params.append("grant_type", "authorization_code");
            params.append("code", String(req.body.body));
            params.append("redirect_uri", process.env.REDIRECT_URL);

            axios.post("https://auth.delta.nitt.edu/api/oauth/token", params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((resp) => {
                axios.post(process.env.RESOURCE_ENDPOINT, {}, {
                    headers: {
                        "Authorization": "Bearer " + resp.data.access_token
                    }
                }).then(async (res) => {
                    const userDetails = res;
                    const isFirstYear = userDetails.data.email.split("@")[0][5] == 2 ? true : false;
                    const roll = userDetails.data.email.split("@")[0];
                    if (!isFirstYear && !(roll == 106120029 || roll == 103120011 || roll == 103120021 || roll == 103120117)) {
                        res.stauts(401).json({ message: "User not first year" });
                    }
                    const retrievedUser = await db.users.findOne({ where: { email: userDetails.data.email } });

                    if (!retrievedUser) {
                        const newUser = await db.users.create({
                            name: userDetails.data.name,
                            email: userDetails.data.email,
                            mobile_number: userDetails.data.phoneNumber,
                            gender: userDetails.data.gender,
                            department_id: userDetails.data.email.substring(1, 3),
                            fcm_token: "123",
                        });
                    }
                    const payload = {
                        "user_email": userDetails.data.email,
                        "user_name": userDetails.data.name,
                    };
                    const authToken = jwt.sign(payload, process.env.JWT_SECRET);
                    logger.info(`${userDetails.data.name} user logged in`);
                    response.cookie('auth_token', authToken, { maxAge: 7 * 24 * 60 * 60 * 1000 });
                    response.status(200).json({
                        name: userDetails.data.name,
                        email: userDetails.data.email,
                        phoneNumber: userDetails.data.phoneNumber,
                        gender: userDetails.data.gender
                    });
                }).catch(err => {
                    response.status(400);
                    logger.error("Error fetching resource", err)
                });
            }).catch(err => logger.error("Error fetching token", err));
        } catch (err) {
            logger.error("/dauth failed with error ", err);
            response.status(500).set({
                "X-Error": "An unexpected error occurred while authentication"
            }).json({ message: "An unexpected error occurred while authentication" });
        }
    }
};