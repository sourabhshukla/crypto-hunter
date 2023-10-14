import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import NotFound from "./Pages/NotFound";
import { Box } from "@mui/system";

function App() {
  return (
    <Box
      className="App"
      sx={{ backgroundColor: "#14161a", minHeight: "100vh", color: "white" }}
    >
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="coins/:id" element={<CoinPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
