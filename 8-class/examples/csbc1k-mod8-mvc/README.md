## Firebase MVC App

This tutorial will guide to refactor CRUD example in the form of model, view and controller.

### MVC Project structure 
* **Model** : Include database interaction logic for all the entities
* **View** : Include all the endpoints that clients needs to access.For backend project, `routes` is an alternative name.
* **Controller** : Includes handling of request and response for endpoints in `view`


### Folder Structure
* Create folder structure as follows
```
functions
|-- config
|   |-- firebase.js
|-- controller
|   |-- investor.js
|-- model
|   |--- investor.js
|-- routes
|   |--- investor.js
```

#### Configuring firebase in `config/firebase.js`
* Import firebase libraries
```
const functions = require("firebase-functions");
const admin = require("firebase-admin");
```
* Initialize firebase App
```
const initApp = () => {
  admin.initializeApp(functions.config().firebase);
};
```
* Get firestore instance
```
const getDB = () => {
  return admin.firestore();
};
```
* Get the functions' `onRequest`
```
const getAPI = (main) => {
  return functions.https.onRequest(main);
};
```
* Export `initApp` , `getDB` and `getAPI`
```
module.exports = { initApp, getDB, getAPI };
```

#### Developing CRUD functions in `model/investor.js`
* Import `getDB` from `firebase.js`
```
const { getDB } = require("../config/firebase");
```
* Assign firestore instance to `db`  
```
const db = getDB();
```

* Create an investor collection
```
const investorCollection = "investors";
```

* Add function to insert document
```
// create

const create = async (investor) => {
  await db
    .collection(investorCollection)
    .doc(investor.id)
    .set(Object.assign({}, investor));
};
```
* Add function to retrieve document
```
// retrieve

const retrieve = async (id) => {
  return await (await db.collection(investorCollection).doc(id).get()).data();
};
```
* Add function to update document
```
// update

const update = async (id, investor) => {
  await db
    .collection(investorCollection)
    .doc(id)
    .set(investor, { merge: true });
};
```
* Add function to delete document
```
const remove = async (id) => {
  await db.collection(investorCollection).doc(id).delete();
};
```
* Export all the CRUD function
```
module.exports = { create, retrieve, update, remove };
```

#### Developing router controller in `controller/investor.js`

* For generating unique id, import `uuid`
```
const { v4: uuidv4 } = require("uuid");
```

* To access firestore, import model
```
const { create, retrieve, update, remove } = require("../model/investor");
```
* Add a controller function to add document
```
// add investor
const addInvestor = async (req, res) => {
  try {
    let investor = req.body;
    investor["id"] = uuidv4();

    await create(investor);

    res.status(201).json({
      id: investor.id,
      message: "successfully added investor",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
```
* Add a controller function to retrieve document
```
// get investor by id

const getInvestor = async (req, res) => {
  try {
    let investorId = req.params.id;

    const investor = await retrieve(investorId);

    res.status(201).json(investor);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
```
* Add a controller function to modify document
```
// modify investor by id

const modifyInvestor = async (req, res) => {
  try {
    let investorId = req.params.id;
    let investor = req.body;
    await update(investorId, investor);
    const investorResult = await retrieve(investorId);
    res.status(201).json(investorResult);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
```
* Add a controller function to delete document
```
// delete investor by id

const removeInvestor = async (req, res) => {
  try {
    let investorId = req.params.id;
    await remove(investorId);
    res.status(201).json({ investorId });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
```
* Export all controller functions
```
module.exports = { addInvestor, getInvestor, modifyInvestor, removeInvestor };
```

* Bonus : Add validation for request body to applicable controller function.
* Bonus : Write test cases for all controller functions

#### Develop express routes in `routes/investor.js`
* Import `Router` from `express`
```
const { Router } = require("express");
```
* Import all controller functions
```
const { addInvestor, getInvestor, modifyInvestor, removeInvestor } = require("../controller/investor");
```
* Get the router instance
```
const router = Router();
```
* Add router to add document
```
// insert investor record
router.post("/investor", addInvestor);
```
* Add router to retrieve document
```
// retrieving investor record
router.get("/investor/:id", getInvestor);
```
* Add router to modifdy document
```
// modifying investor record
router.put("/investor/:id", modifyInvestor);
```
* Add router to delete document
```
// deleting investor record
router.delete("/investor/:id", removeInvestor);
```
* Export `router`
```
module.exports = router;
```

#### Add express App as firebase function in `index.js`
* Clear all contents of the `index.js`
* Import `express` and `bodyParser`
```
const express = require("express");
const bodyParser = require("body-parser");
```
* Import necessary functions from `firebase.js`
```
const { initApp, getAPI } = require("./config/firebase");
```

* Initialise firebase
```
// initialize firebase to access its services
initApp();
```

* create express instance in `app` and `main`
```
// initialize express
const app = express();
const main = express();
```

* configure `main`
```
main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
```

* export `webAPI`

```
const webAPI = getAPI(main);
module.exports = { webAPI };
```

* add investorRoutes to `app`

```
const investorRoutes = require("./routes/investors");
app.use("/", investorRoutes);
```

#### Running the firebase App
* `yarn firebase emulators:start`
* Test all endpoints using postman 