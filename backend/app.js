const express = require("express");
const routes = require("./routes/coins.route");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", routes);

app.listen(8082, () => {
  console.log(`App is running on port 8082`);
});

module.exports = app;
