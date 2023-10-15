import { Box } from "@mui/material";
import { TrendingCoins } from "../../config/api";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { trendingData } from "../../utils/demoResponses";

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const { enqueueSnackbar } = useSnackbar();

  const fetchTrendingCoins = async () => {
    try {
      const response = await axios.get(TrendingCoins(currency));
      const { data } = response.data;
      setTrending(data);
    } catch (err) {
      //console.log(err.response.status);
      setTrending(trendingData);
      if (err.response && err.response.status === 429) {
        enqueueSnackbar(`API Rate limit Exceeded`, {
          variant: "error",
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
          autoHideDuration: 4000,
        });
      } else {
        enqueueSnackbar(`${err.message}`, {
          variant: "error",
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
          autoHideDuration: 4000,
        });
      }
    }
  };

  console.log(trending);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link
        to={`/coins/${coin.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTrasform: "uppercase",
          color: "white",
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: "10px" }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: "22px", fontWeight: "500" }}>
          {symbol}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <Box sx={{ height: "50%", display: "flex", alignItems: "center" }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </Box>
  );
};

export default Carousel;
