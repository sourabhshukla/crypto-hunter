const express = require("express");
const routes = require("./routes/coins.route");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", routes);

app.listen(process.env.PORT || 8082, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});

module.exports = app;
