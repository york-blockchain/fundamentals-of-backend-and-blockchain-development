const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

// initialize firebase to access its services
admin.initializeApp(functions.config().firestore);

// initialize express
const app = express();
const main = express();

main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

const db = admin.firestore();
const investorCollection = "investors";

const webAPI = functions.https.onRequest(main);

class Investor {
  constructor(id, firstname, lastname, balance, networth, assets = {}) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.balance = balance;
    this.networth = networth;
    this.assets = assets;
  }
}

app.post("/investors", async (req, res) => {
  const mockInvestor = new Investor(
    uuidv4(),
    "vitalik",
    "buterin",
    1000,
    2000,
    {
      ETH: "500",
      BTC: "100",
    }
  );
  await db
    .collection(investorCollection)
    .doc(mockInvestor.id)
    .set(Object.assign({}, mockInvestor));

  res.status(201).send(`Successfully added investor with ${mockInvestor.id}`);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello YorkU!");
// });

module.exports = { webAPI };
