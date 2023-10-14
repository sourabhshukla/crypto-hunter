import { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../../config/api";
import {
  Box,
  Button,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { chartDays } from "../../config/data";
import SelectButton from "../SelectButton/SelectButton";
import { useSnackbar } from "notistack";
Chart.register(...registerables);

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    console.log(coin);
    try {
      const response = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      console.log(response.data);
      const { data } = response.data;
      setHistoricalData(data);
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

  //console.log(historicalData);

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          width: ["100%", "100%", "100%", "75%"],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: [0, 0, 0, "25px"],
          padding: ["20px", "20px", "20px", "40px"],
          paddingTop: [0, 0, 0, "40px"],
        }}
      >
        {!historicalData ? (
          <CircularProgress sx={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <Line
            style={{ cursor: "pointer" }}
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price (Past ${days} Days) in ${currency}`,
                  borderColor: "#eebc1d",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}

        <Box
          sx={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              handleClick={() => setDays(day.value)}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CoinInfo;
