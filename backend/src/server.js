const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mikael:fimika13@mntbk-qboul.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(routes);

app.listen(3333);