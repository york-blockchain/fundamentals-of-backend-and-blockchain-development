const { v4: uuidv4 } = require("uuid");
const { create, retrieve, update, remove } = require("../model/investor");

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

module.exports = { addInvestor, getInvestor, modifyInvestor, removeInvestor };
