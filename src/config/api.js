const baseUrl = `https://54.242.101.157:8082`;

export const CoinList = (currency) => `${baseUrl}/coins?currency=${currency}`;

export const SingleCoin = (id) => `${baseUrl}/coin/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `${baseUrl}/historic?id=${id}&days=${days}&currency=${currency}`;

export const TrendingCoins = (currency) =>
  `${baseUrl}/trending?currency=${currency}`;
