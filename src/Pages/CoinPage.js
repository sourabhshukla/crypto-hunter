import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import axios from "axios";
import CoinInfo from "../Components/CoinInfo/CoinInfo";
import { Box, LinearProgress, Typography } from "@mui/material";
import parse from "html-react-parser";
import { numberWithCommas } from "../Components/Carousel/Carousel";
import { useSnackbar } from "notistack";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const { currency, symbol } = CryptoState();
  console.log(currency);

  const fetchCoin = async () => {
    try {
      const response = await axios.get(SingleCoin(id));
      const { data } = response.data;
      setCoin(data);
    } catch (err) {
      if (err.response.status === 429) {
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

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);
  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: ["column", "column", "column", "row"],
        alignItems: ["center"],
      }}
    >
      <Box
        sx={{
          width: ["100%", "100%", "100%", "30%"],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "25px",
          borderRight: "2px solid grey",
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200px"
          style={{ marginBottom: "20px" }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: "20px",
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: "25px",
            paddingBottom: "15px",
            paddingTop: "0px",
            textAlign: "justify",
          }}
        >
          {parse(coin?.description.en.split(".")[0])}.
        </Typography>
        <Box
          sx={{
            alignSelf: "start",
            padding: "25px",
            paddingTop: "10px",
            width: "100%",
            display: "flex",
            alignItems: ["start", "center", "center"],
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Rank:
            </Typography>{" "}
            &nbsp;&nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Current Price:
            </Typography>{" "}
            &nbsp;&nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency])}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Market Cap:
            </Typography>{" "}
            &nbsp;&nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency].toString().slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </Box>
      </Box>
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
