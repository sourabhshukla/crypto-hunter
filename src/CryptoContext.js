import { createContext, useContext, useEffect, useState } from "react";
import { getSymbols } from "./utils/currencies";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("inr");
  const [symbol, setSymbol] = useState("₹");
  useEffect(() => {
    setSymbol(getSymbols.get(currency));
  }, [currency]);
  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
