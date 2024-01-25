/* eslint-disable require-jsdoc */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const {v4: uuidv4} = require("uuid");

// initialize firebase to access services
admin.initializeApp(functions.config().firestore);

// initializing express
const app = express();
const main = express();

main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

const db = admin.firestore();
const investorCollection = "investors";

const webAPI = functions.https.onRequest(main);

class Investor {
  constructor(id, firstname, lastname, balance, network, assets = {}) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.balance = balance;
    this.network = network;
    this.assets = assets;
  }
}


app.post("/investors", async (req, res) => {
  const mockInvestor = new Investor(
      uuidv4(),
      "Vitalik",
      "Buterin",
      1000,
      2000,
      {
        ETH: "200",
        BTC: "200",
      },
  );

  await
  db.collection(investorCollection)
      .doc(mockInvestor.id)
      .set(Object.assign({}, mockInvestor));

  res.status(201).send(`Successfully added investor with ${mockInvestor.id}`);
});

module.exports = {webAPI};
