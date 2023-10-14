const { default: axios } = require("axios");
const {
  CoinList,
  SingleCoin,
  TrendingCoins,
  HistoricalChart,
} = require("../api/api");
const {
  allCoinsData,
  singleCoinResponse,
  historicData,
  trendingData,
} = require("../demoResponses.js");

const getAllCoins = async (req, res) => {
  const { currency } = req.query;
  //console.log(currency);
  try {
    //const response = { status: 200, data: allCoinsData };
    const response = await axios.get(CoinList(currency));
    console.log(response.status);
    const data = response.data.map((item) => {
      return {
        id: item.id,
        symbol: item.symbol,
        name: item.name,
        image: item.image,
        current_price: item.current_price,
        market_cap: item.market_cap,
        price_change_24h: item.price_change_24h,
        price_change_percentage_24h: item.price_change_percentage_24h,
      };
    });
    res.status(response.status || 200).json({ success: true, data: data });
  } catch (err) {
    //console.log(err.status);
    res.status(err.response.status || 500).json({
      success: false,
      msg: err.message,
    });
  }
};

const getCoin = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // const response = {
    //   status: 200,
    //   data: singleCoinResponse,
    // };
    const response = await axios.get(SingleCoin(id));
    const { image, name, description, market_cap_rank, market_data } =
      response.data;
    res.status(response.status || 200).json({
      success: true,
      data: {
        id,
        image,
        name,
        description,
        market_cap_rank,
        market_data,
      },
    });
  } catch (err) {
    res.status(err.response.status || 500).json({
      success: false,
      msg: err.message,
    });
  }
};

const getHistoricData = async (req, res) => {
  try {
    const { id, currency, days } = req.query;
    // const response = {
    //   status: 200,
    //   data: historicData,
    // };
    const response = await axios.get(HistoricalChart(id, days, currency));
    res.status(response.status || 200).json({
      success: true,
      data: response.data.prices,
    });
  } catch (err) {
    res.status(err.response.status || 500).json({
      success: false,
      msg: err.message,
    });
  }
};

const getTrendingCoins = async (req, res) => {
  try {
    const { currency } = req.query;
    //console.log("here");
    // const response = {
    //   status: 200,
    //   data: trendingData,
    // };
    const response = await axios.get(TrendingCoins(currency));
    res.status(response.status || 200).json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    // const e = JSON.parse(JSON.stringify(err));
    // console.log(err.response.status);
    res.status(err.response.status || 500).json({
      success: false,
      msg: err.message,
    });
  }
};

module.exports = {
  getAllCoins,
  getCoin,
  getHistoricData,
  getTrendingCoins,
};
