const { Router } = require("express");
const { addInvestor, getInvestor, modifyInvestor, removeInvestor } = require("../controller/investor");

const router = Router();

// insert investor record
router.post("/investor", addInvestor);

// retrieving investor record
router.get("/investor/:id", getInvestor);

// modifying investor record
router.put("/investor/:id", modifyInvestor);

// deleting investor record
router.delete("/investor/:id", removeInvestor);

module.exports = router;
