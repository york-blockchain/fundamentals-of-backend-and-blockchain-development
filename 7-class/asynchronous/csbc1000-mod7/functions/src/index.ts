import * as functions from "firebase-functions";
import admin from "firebase-admin";
import express, {Request, Response} from "express";
import BodyParser from "body-parser";
import {v4 as uuidv4} from "uuid";
import {DocumentSnapshot} from "firebase-functions/v1/firestore";

// initialize firebase to access it services
admin.initializeApp(functions.config().firebase);

// initialize express
const app = express();
const main = express();

// add path to receive request
// and use body-parser to process body
main.use("/api/v1", app);
main.use(BodyParser.json());
main.use(BodyParser.urlencoded({extended: false}));

// get access to firestore database
// and set a name for collection
const db = admin.firestore();
const investorsCollection = "investors";

// create cloud function and export it
export const webAPI = functions.https.onRequest(main);

interface InvestorInterface {
  firstname: string;
  lastname: string;
  balance: number;
  networth: number;
  assets: Record<string, unknown>;
}

// this custom object represents an investor's data model
/**
 * @template T
 */
class Investor {
  id: string;
  firstname: string;
  lastname: string;
  balance: number;
  network: number;
  assets: Record<string, unknown>;
  /**
   * @param {id} id
   * @param {firstname} firstname
   * @param {lastname} lastname
   * @param {balance} balance
   * @param {networth} networth
   * @param {assets} assets
   */
  constructor(
      id: string,
      firstname: string,
      lastname: string,
      balance: number,
      networth: number,
      assets: Record<string, unknown> = {}
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.balance = balance;
    this.network = networth;
    this.assets = assets;
  }
}

app.post("/investors", async (req: Request, res: Response) => {
  try {
    // create a new test object
    const mockInvestor = new Investor(
        uuidv4(),
        "vitalik",
        "nakamoto",
        1000,
        2000,
        {
          ETH: 10,
          BTC: 12,
        }
    );
    // synchronously send this to the database
    await db
        .collection(investorsCollection)
        .doc(mockInvestor.id)
        .set(Object.assign({}, mockInvestor));

    res.status(201).send(`Successfully added investor ${mockInvestor.id}`);
  } catch (error) {
    // handle errors
    res.status(400).send(error);
  }
});

app.post("/investors/create", async (req: Request, res: Response) => {
  try {
    // synchronously send this to the database
    const id = uuidv4();
    await db
        .collection(investorsCollection)
        .doc(id)
        .set(Object.assign({}, req.body));

    res.status(201).send(`Successfully added investor ${id}`);
  } catch (error) {
    // handle errors
    res.status(400).send(error);
  }
});

app.get("/investors/:id", async (req: Request, res: Response) => {
  try {
    const result: DocumentSnapshot = await db
        .collection(investorsCollection)
        .doc(req.params.id)
        .get();

    res.status(201).json({id: req.params.id, data: result.data()});
  } catch (error) {
    // handle errors
    res.status(400).send(error);
  }
});

app.get("/investors/", async (req: Request, res: Response) => {
  try {
    const result = await db.collection(investorsCollection).get();
    const investors: {
      id: string;
      data: InvestorInterface;
    }[] = [];
    result.forEach((doc: DocumentSnapshot) => {
      investors.push({
        id: doc.id,
        data: doc.data() as InvestorInterface,
      });
    });
    res.status(201).json(investors);
  } catch (error) {
    // handle errors
    res.status(400).send(error);
  }
});

app.delete("/investors/:id", async (req: Request, res: Response) => {
  try {
    await db.collection(investorsCollection).doc(req.params.id).delete();
    res.status(201).send(`Successfully deleted : ${req.params.id}`);
  } catch (error) {
    // handle errors
    res.status(400).send(error);
  }
});

app.put("/investors/:id", async (req: Request, res: Response) => {
  try {
    await db
        .collection(investorsCollection)
        .doc(req.params.id)
        .set(req.body, {merge: true});
    const result: DocumentSnapshot = await db
        .collection(investorsCollection)
        .doc(req.params.id)
        .get();

    res.status(201).json({id: req.params.id, data: result.data()});
  } catch (error) {
    // handle errors
    res.status(400).send(error);
  }
});
