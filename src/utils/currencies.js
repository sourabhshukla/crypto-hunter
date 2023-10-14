const currencies = [
  "btc",
  "eth",
  "ltc",
  "bch",
  "bnb",
  "eos",
  "xrp",
  "xlm",
  "link",
  "dot",
  "yfi",
  "usd",
  "aed",
  "ars",
  "aud",
  "bdt",
  "bhd",
  "bmd",
  "brl",
  "cad",
  "chf",
  "clp",
  "cny",
  "czk",
  "dkk",
  "eur",
  "gbp",
  "hkd",
  "huf",
  "idr",
  "ils",
  "inr",
  "jpy",
  "krw",
  "kwd",
  "lkr",
  "mmk",
  "mxn",
  "myr",
  "ngn",
  "nok",
  "nzd",
  "php",
  "pkr",
  "pln",
  "rub",
  "sar",
  "sek",
  "sgd",
  "thb",
  "try",
  "twd",
  "uah",
  "vef",
  "vnd",
  "zar",
  "xdr",
  "xag",
  "xau",
  "bits",
  "sats",
];

const getSymbols = new Map();

getSymbols.set("btc", "₿");
getSymbols.set("eth", "Ξ");
getSymbols.set("ltc", "Ł");
getSymbols.set("bch", "BCH");
getSymbols.set("bnb", "BNB");
getSymbols.set("eos", "EOS");
getSymbols.set("xrp", "X");
getSymbols.set("xlm", "XLM");
getSymbols.set("link", "LINK");
getSymbols.set("dot", "DOT");
getSymbols.set("yfi", "YFI");
getSymbols.set("usd", "$");
getSymbols.set("aed", "AED");
getSymbols.set("ars", "$");
getSymbols.set("aud", "A$");
getSymbols.set("bdt", "৳");
getSymbols.set("bhd", ".د.");
getSymbols.set("bmd", "$");
getSymbols.set("brl", "R$");
getSymbols.set("cad", "CA$");
getSymbols.set("chf", "Fr.");
getSymbols.set("clp", "$");
getSymbols.set("cny", "¥");
getSymbols.set("czk", "Kč");
getSymbols.set("dkk", "Kr.");
getSymbols.set("eur", "€");
getSymbols.set("gbp", "£");
getSymbols.set("hkd", "HK$");
getSymbols.set("huf", "Ft");
getSymbols.set("idr", "Rp");
getSymbols.set("ils", "₪");
getSymbols.set("inr", "₹");
getSymbols.set("jpy", "¥");
getSymbols.set("krw", "₩");
getSymbols.set("kwd", "د.ك");
getSymbols.set("lkr", "රු");
getSymbols.set("mmk", "K");
getSymbols.set("mxn", "Mex$");
getSymbols.set("myr", "RM");
getSymbols.set("ngn", "₦");
getSymbols.set("nok", "kr");
getSymbols.set("nzd", "$");
getSymbols.set("php", "₱");
getSymbols.set("pkr", "₨");
getSymbols.set("pln", "zł");
getSymbols.set("rub", "RUB");
getSymbols.set("sar", "ر.س");
getSymbols.set("sek", "kr");
getSymbols.set("sgd", "S$");
getSymbols.set("thb", "฿");
getSymbols.set("try", "₺");
getSymbols.set("twd", "NT$");
getSymbols.set("uah", "₴");
getSymbols.set("vef", "Bs");
getSymbols.set("vnd", "₫");
getSymbols.set("zar", "R");
getSymbols.set("xdr", "XDR");
getSymbols.set("xag", "XAG");
getSymbols.set("xau", "XAU");
getSymbols.set("bits", "BITS");
getSymbols.set("sats", "SATS");

export { getSymbols };

export default currencies;
