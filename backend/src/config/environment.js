require("dotenv").config();

const environment = ["DATABASE", "PORT"];

environment.forEach(name => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

const config = {
  DATABASE: process.env.DATABASE,
  PORT: process.env.PORT
};

module.exports = config;
