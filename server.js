const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbInit = require('./helpers/dbInitializer');
const controller = require('./controllers/controller');

require('dotenv').config();

//Default to 9080 if port is not specified as environment variable
const servePort = process.env.PORT || '9080';

const server = express();
server.use([bodyParser.json(), cors()]);

dbInit.initConnection(() => {
    //create a metric entry
    server.post("/createMetrics", (req, resp) => {
        controller.createAnalyticData(req.body, resp);
    });

    //get metrics by time filter
    server.get("/getMetrics", (req, resp) => {
        controller.getAnalyticData(req, resp);
    });
});

//index page for the analytic api
server.get('/', (req, resp) => {
    resp.sendFile(__dirname + "/index.html");
});

server.listen(servePort, () => {
    console.log(`Server started at port: ${servePort}`);
});

module.exports = {
  server
};