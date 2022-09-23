const express = require("express");
const bodyParser = require("body-parser");
const { initApp, getAPI } = require("./config/firebase");

// initialize firebase to access its services
initApp();

// initialize express
const app = express();
const main = express();

main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

const webAPI = getAPI(main);
module.exports = { webAPI };

const investorRoutes = require("./routes/investors");
app.use("/", investorRoutes);
