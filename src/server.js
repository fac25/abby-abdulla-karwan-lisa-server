const express = require("express");

const bodyParser = express.urlencoded();

const server = express();

server.get("/", (req, res) => {
    res.send(`<h1>Hello!</h1>`);
  });

module.exports = server;
