const { getDB } = require("../config/firebase");

const db = getDB();
const investorCollection = "investors";

// create

const create = async (investor) => {
  await db
    .collection(investorCollection)
    .doc(investor.id)
    .set(Object.assign({}, investor));
};

// retrieve

const retrieve = async (id) => {
  return await (await db.collection(investorCollection).doc(id).get()).data();
};

// update

const update = async (id, investor) => {
  await db
    .collection(investorCollection)
    .doc(id)
    .set(investor, { merge: true });
};

// delete

const remove = async (id) => {
  await db.collection(investorCollection).doc(id).delete();
};

module.exports = { create, retrieve, update, remove };
