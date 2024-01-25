
## Pre-requisites
* Download [Node.js](https://nodejs.org/en/download) (this will also install npm).
* Download [Postman](https://www.postman.com/downloads/).
* Create a [Firebase](https://firebase.google.com/) account if don't have one.

## Project Setup
* Create folder with name `csbc1000_mod7`
* Navigate to `csbc1000_mod7` by running `cd csbc1000_mod7`
* initialize npm project `yarn -y init`
* Install `firebase-tools` by running `yarn add -D firebase-tools`
* Run `yarn firebase login` (on your terminal/command prompt) to connect to your Firebase account

>* Allow Firebase to collect CLI and Emulator Suite usage and error reporting information? n
>* A url in browser will be open which will ask you to login to firebase. 
* Please allow any permissions as prompted.
<br/>![](./firebase-cli-access-permission.png)
* After successful login you should be able to following message in browser
<br/>![](./firebase-login-success.png) 
* You'll also see a success message in terminal
```
✔  Success! Logged in as your@email.com
```
* Create a project using [firebase console](https://console.firebase.google.com) by clicking on **create a project**
<br/>![](./create-project.png)
* Provide a name to the project "csbc1000-mod7", agree all terms and press **continue**
![](./name-a-project.png)
* Enable or Disable google analytics for your firebase project and press **create project**
![](./google-analytics-agreement.png)
* you'll see prompt that shows progress of project creation
<br/>![](./creating-project.png)
* Once your project, you'll see following message. press **continue**
<br/>![](./project-is-ready.png)
* On the firebase dashboard, click **Project overview**
<br/>![](./click-project-overview.png)
* Select **cloud firestore**
<br/>![](./select-cloud-firestore.png)
* Press **create database**
<br/>![](./create-database.png)
* Set the region based on your location and hit **next**
<br/>![](./select-database-region.png)
* Select **start in test mode** and hit **next**<br/>
![](./database-secure-rules.png)
* You'll see a message on provisioning of cloud firestore
<br/>![](./provisioning-cloud-firestore.png)
* run `yarn firebase init`
* select firestore, functions and emulator 
 ![](./select-firebase-features.png)
* select `use existing project`
<br/>![](./firebase-cli-select-project.png)
<br/>![](./firebase-cli-select-correct-project.png)
* Select `javascript` for Cloud Functions language
* select `y` for eslint rules
* select `n` for installing deps with `npm`
<br/>![](./firebase-cli-functions-setup.png)
* setup firebase firestore
<br/>![](./firestore-setup.png)
* select `functions` and `firestore` emulator
* accept default port for functions emulator
* accept default port for firestore emulator
* select `y`for the Emulator UI
* press enter when prompted for `Which port do you want to use for the Emulator UI (leave empty to use any available port)?`
* select `y` to download the emulators now
<br/>![](./firebase-cli-emulator-setup.png)
* After firebase project is initialized you'll see
```
✔  Firebase initialization complete!
```
* `cd functions` run `yarn add express body-parser uuid`
* run `cd ..` and Let us test the setup by running `yarn firebase emulators:start`
<br/>![](./firebase-emulator-test.png)
* You should be able to open emulator dashboard on browser. URL of the same can be identified from above image.
<br/>![](./emulator-dashboard.png)
* let us hit API using postman
<br/>![](./hello-from-firebase.png)
* now stop the emulator on terminal by hitting ctrl+c

* Replace code inside `functions/index.js` with following
```
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
```

* Start the server again by `yarn firebase emulators:start`
<br/>![](./webapi-emulator.png)

* Make sure that firestore emulator will be empty
<br/>![](./firestore-empty-collection.png)

* let us add some data by hitting `/investors` API using postman
<br/>![](./post-req-postman.png)

* Verify the data got added inside firestore
<br/>![](./firestore-data-available.png)