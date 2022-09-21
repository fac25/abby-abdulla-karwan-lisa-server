const express = require("express");

const bodyParser = express.urlencoded();

const server = express();

const posts = [{
  name: "Abby",
  message: "Abby is the BOSS!",
  date: "02/26/2022"
}];


server.post("/", bodyParser, (req, res) => {
    const name = req.body.name;
    const message = req.body.message;
    const date = Date()

    posts.push({name, message, date})
    res.redirect("/")
  });

module.exports = server;


