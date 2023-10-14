const express = require("express");
const {
  getAllCoins,
  getCoin,
  getHistoricData,
  getTrendingCoins,
} = require("../controllers/coinsController");

const router = express.Router();

router.get("/coins", getAllCoins);
router.get("/coin/:id", getCoin);
router.get("/historic", getHistoricData);
router.get("/trending", getTrendingCoins);

module.exports = router;
