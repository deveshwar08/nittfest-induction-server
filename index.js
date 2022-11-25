const express = require('express');
const cookieParser = require('cookie-parser');
const httplogger = require('./middleware/httplogger');
const cors = require("cors");
require('dotenv').config();
const router = require('./routes/auth.route');

const db = require("./models");
const logger = require('./utils/logger');
db.sequelize.authenticate().then(() => {
    logger.info("DB connected successfully");
    db.sequelize.sync({ force: false }).then(() => {
        logger.info("DB synced successfully");
    }).catch(err => {
        logger.error("DB sync failed: ", err);
    });
}).catch(err => {
    logger.error("Error connecting DB: ", err);
});

const app = express();

app.use(cors());
app.use(httplogger);
app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());
app.use('/', router);


const port = 10000;
app.listen(port, () => {
    console.log("App is listening to port ", port);
});
