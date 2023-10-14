import { AppBar, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import currencies from "../../utils/currencies";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              sx={{
                flex: 1,
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Crypto Hunter
            </Typography>

            <Select
              variant="outlined"
              sx={{ width: "100px", height: "40px" }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <MenuItem value={currency}>{currency.toUpperCase()}</MenuItem>
              ))}
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
