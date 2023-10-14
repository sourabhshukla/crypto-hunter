import { useEffect, useState } from "react";
import { CoinList } from "../../config/api";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { Container } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../Carousel/Carousel";
import { SentimentDissatisfied } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { allCoinsData } from "../../utils/demoResponses";

const columns = ["Coin", "Price", "24hr Change", "Market Cap"];

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortFilter, setSortFilter] = useState({
    type: "market-cap-sort",
    asc: false,
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { currency, symbol } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const response = await axios.get(CoinList(currency));
      const { data } = response.data;
      setCoins(data);
      setFilteredCoins(data);
      setLoading(false);
    } catch (err) {
      console.log(allCoinsData);
      setCoins(allCoinsData);
      setFilteredCoins(allCoinsData);
      //console.log("sdff");
      //return enqueueSnackbar("err.message", { variant: "error" });
    }
    setLoading(false);
  };

  //console.log(coins);

  const handleSearch = () => {
    console.log(search);
    // if (search === "") {
    //   setFilteredCoins(coins);
    //   return;
    // }

    setFilteredCoins(
      coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      )
    );
    // handleSort(sortFilter.type, sortFilter.asc);
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  useEffect(() => {
    handleSort(sortFilter.type, sortFilter.asc);
  }, [filteredCoins]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSortFilter({ type: name, asc: value });
    handleSort(name, value);
  };

  const handleSort = (type, asc) => {
    //const { type, asc } = sortFilter;
    if (type === "coin-sort") {
      setFilteredCoins(
        filteredCoins.sort((a, b) => {
          let stringA = a.name.toUpperCase();
          let stringB = b.name.toUpperCase();

          if (stringA < stringB) return asc ? -1 : 1;
          if (stringA > stringB) return asc ? 1 : -1;
          return 0;
        })
      );
    } else if (type === "price-sort") {
      setFilteredCoins(
        filteredCoins.sort((a, b) => {
          let priceA = a.current_price;
          let priceB = b.current_price;

          if (priceA < priceB) return asc ? -1 : 1;
          if (priceA > priceB) return asc ? 1 : -1;
          return 0;
        })
      );
    } else if (type === "24hr-change-sort") {
      setFilteredCoins(
        filteredCoins.sort((a, b) => {
          let changeA = a.price_change_percentage_24h;
          let changeB = b.price_change_percentage_24h;

          if (changeA < changeB) return asc ? -1 : 1;
          if (changeA > changeB) return asc ? 1 : -1;
          return 0;
        })
      );
    } else if (type === "market-cap-sort") {
      setFilteredCoins(
        filteredCoins.sort((a, b) => {
          let marketA = a.market_cap;
          let marketB = b.market_cap;

          if (marketA < marketB) return asc ? -1 : 1;
          if (marketA > marketB) return asc ? 1 : -1;
          return 0;
        })
      );
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  if (loading)
    return (
      <Box
        sx={{
          width: "100%",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "gold",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <CircularProgress sx={{ color: "gold" }} size={250} thickness={1} />
        Loading Please Wait...
      </Box>
    );
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ margin: "18px", fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          sx={{ marginBottom: "20px", width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            gap: "20px",
            marginBottom: "18px",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ margin: "18px", marginLeft: 0, fontFamily: "Montserrat" }}
          >
            Sort By :
          </Typography>
          <FormControl sx={{ width: 140 }}>
            <InputLabel id="coin-sort-label">Coin</InputLabel>
            <Select
              labelId="coin-sort-label"
              id="coin-sort"
              name="coin-sort"
              value={sortFilter.type === "coin-sort" ? sortFilter.asc : ""}
              onChange={handleChange}
            >
              <MenuItem value={true}>A - Z</MenuItem>
              <MenuItem value={false}>Z - A</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 140 }}>
            <InputLabel id="price-sort-label">Price</InputLabel>
            <Select
              labelId="price-sort-label"
              id="price-sort"
              name="price-sort"
              value={sortFilter.type === "price-sort" ? sortFilter.asc : ""}
              onChange={handleChange}
            >
              <MenuItem value={true}>Ascending</MenuItem>
              <MenuItem value={false}>Descending</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 140 }}>
            <InputLabel id="24hr-change-sort-label">24hr Change</InputLabel>
            <Select
              labelId="24hr-change-sort-label"
              id="24hr-change-sort"
              name="24hr-change-sort"
              value={
                sortFilter.type === "24hr-change-sort" ? sortFilter.asc : ""
              }
              onChange={handleChange}
            >
              <MenuItem value={true}>Ascending</MenuItem>
              <MenuItem value={false}>Descending</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 140 }}>
            <InputLabel id="market-cap-sort-label">Market Cap</InputLabel>
            <Select
              labelId="market-cap-sort-label"
              id="market-cap-sort"
              name="market-cap-sort"
              value={
                sortFilter.type === "market-cap-sort" ? sortFilter.asc : ""
              }
              onChange={handleChange}
            >
              <MenuItem value={true}>Ascending</MenuItem>
              <MenuItem value={false}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#eebc1d" }}>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={col}
                      align={col === "Coin" ? "" : "right"}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCoins.length > 0
                  ? filteredCoins
                      ?.slice((page - 1) * 10, page * 10)
                      .map((row) => {
                        const profit = row.price_change_percentage_24h > 0;

                        return (
                          <TableRow
                            onClick={() => navigate(`/coins/${row.id}`)}
                            key={row.id}
                            sx={{
                              backgroundColor: "#16171a",
                              cursor: "pointer",
                              "&:hover": {
                                backgroundColor: "#131111",
                              },
                              fontFamily: "Montserrat",
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{ display: "flex", gap: "15px" }}
                            >
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="50px"
                                style={{ marginBottom: "10px" }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span style={{ color: "darkgrey" }}>
                                  {row.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell align="right">
                              {symbol}{" "}
                              {numberWithCommas(row.current_price.toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{
                                color: profit ? "rgb(14, 203,129)" : "red",
                              }}
                            >
                              {profit && "+"}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>
                            <TableCell align="right">
                              {symbol}{" "}
                              {numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )}
                              M
                            </TableCell>
                          </TableRow>
                        );
                      })
                  : null}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        {filteredCoins.length === 0 && (
          <Box
            sx={{
              backgroundColor: "#16171a",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#131111",
              },
              fontFamily: "Montserrat",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                margin: "18px",
                marginLeft: 0,
                fontFamily: "Montserrat",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                display: "flex",
                gap: "10px",
              }}
            >
              <SentimentDissatisfied /> <p>No Products Found</p>
            </Typography>
          </Box>
        )}
        <Pagination
          sx={{
            padding: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "ul .MuiPaginationItem-root": {
              color: "gold",
            },
          }}
          count={Math.ceil(filteredCoins?.length / 10)}
          onChange={(event, value) => {
            setPage(value);
            window.scroll(0, 464);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
