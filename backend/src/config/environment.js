require("dotenv").config();

const environment = ["DATABASE", "PORT", "FROM_EMAIL", "FROM_PASSWORD"];

environment.forEach(name => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

const config = {
  DATABASE: process.env.DATABASE,
  PORT: process.env.PORT,
  FROM_EMAIL: process.env.FROM_EMAIL,
  FROM_PASSWORD: process.env.FROM_PASSWORD
};

module.exports = config;
