const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const { default: Ajv } = require("ajv");

// initialize firebase to access its services
admin.initializeApp(functions.config().firestore);

// initialize express
const app = express();
const main = express();
const ajv = new Ajv();

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

app.post("/investors", async (_, res) => {
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

// CRUD -> create , retrieve, update and delete

const schema = {
  type: 'object',
  properties: {
    firstname: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    },
    balance: {
      type: 'number'
    },
    networth: {
      type: 'number'
    },
    assets: {
      type: 'object',
      patternProperties: {
        '^[A-Z](8)$':
          { type: 'string', pattern: '^[0-9]+$' }
      }
    }
  },
  required:['firstname','lastname','balance','networth','assets']
}

const validate = ajv.compile(schema)

// create
// /investors/create
app.post("/investors/create", async (req, res) => {
  try {
    // validate the req object
    const isValid = validate(req.body)
    if (!isValid) {
      return res.status(400).send(`the field ${validate.errors[0].instancePath.substring(1)}  ${validate.errors[0].message}`)
    }
    // create an uuid
    const id = uuidv4();
    // insert into firestore database
    await db
      .collection(investorCollection)
      .doc(id)
      .set(Object.assign({}, req.body));

    res.status(201).send(`Successfully added investor with ${id}`);
  } catch (error) {
    res.status(500).send(error.essage)
  }
})

// get by id
// /investors/:id
app.get("/investors/:id", async (req, res) => {
  try {
    // fetch the record from firestore database by id
    const result = await db.collection(investorCollection).doc(req.params.id).get()

    res.status(200).json({ id: req.params.id, data: result.data() })
  } catch (error) {
    res.status(500).send(error.essage)
  }
})

// get all
// /investors
app.get("/investors/", async (req, res) => {
  try {
    // fetch all the records from firestore database
    const result = await db.collection(investorCollection).get()

    const investors = []

    result.forEach(doc => {
      investors.push({
        id: doc.id,
        data: doc.data()
      })
    });
    res.status(200).json(investors)
  } catch (error) {
    res.status(500).send(error.essage)
  }
})

const updateSchema = {
  type: 'object',
  properties: {
    firstname: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    },
    balance: {
      type: 'number'
    },
    networth: {
      type: 'number'
    },
    assets: {
      type: 'object',
      patternProperties: {
        '^[A-Z](8)$':
          { type: 'string', pattern: '^[0-9]+$' }
      }
    }
  }
}

const updateValidate = ajv.compile(updateSchema)

// update by id
// /investors/:id
app.put("/investors/:id", async (req, res) => {
  try {
    // validate the record 
    const isValid = updateValidate(req.body)
    if (!isValid) {
      return res.status(400).send(`the field ${updateValidate.errors[0].instancePath.substring(1)}  ${updateValidate.errors[0].message}`)
    }
    // modify record by id in the firestore database
    await db.collection(investorCollection).doc(req.params.id).set(req.body, { merge: true })
    // fetch the record from firestore database by id
    const result = await db.collection(investorCollection).doc(req.params.id).get()
    res.status(201).json({ id: req.params.id, data: result.data() })
  } catch (error) {
    res.status(500).send(error.essage)
  }
})

// delete by id
// /investors/:id
app.delete("/investors/:id", async (req, res) => {
  try {
    const id = req.params.id
    const result = await db.collection(investorCollection).doc(id).get()
    if (result.data() == undefined) {
      throw new Error(`record with id : ${id} does not exist`)
    }
    // remove a record by id in the firestore database
    await db.collection(investorCollection).doc(req.params.id).delete();
    res.status(201).send(`Successfully deleted : ${req.params.id}`)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = { webAPI };
