const express = require("express");
const mongoose = require("mongoose");

const environment = require("./config/environment");

mongoose.connect(environment.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(routes);

app.listen(environment.PORT, () => {
  console.log(`Server is listening on port ${environment.PORT}`);
});
