var express = require('express');
var router = express.Router();
var axios = require("axios");

/* GET home page. */
router.get('/', async function (req, res, next) {
  var response = await axios.get("https://api.coingecko.com/api/v3/coins/ethereum");
  res.render('index', { priceUSD: response.data.market_data["current_price"]["usd"], priceCAD: response.data.market_data["current_price"]["cad"] });
});

module.exports = router;
