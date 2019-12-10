const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const environment = require("./config/environment");

mongoose.connect(environment.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files/avatar', express.static(path.resolve(__dirname, '..', 'uploads', 'avatar')))
app.use(bodyParser.json());
app.use(routes);

app.listen(environment.PORT, () => {
  console.log(`Server is listening on port ${environment.PORT}`);
});
