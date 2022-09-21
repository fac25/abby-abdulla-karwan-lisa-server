const express = require("express");

const bodyParser = express.urlencoded();

const server = express();

server.get("/", (req, res) => {
  const content = `<!DOCTYPE html>
    <html>
        <head>
        <meta charset="utf-8">
        <title>Home</title>
        </head>
        <body>
        <h1>Micro Blog</h1>
        <form method="POST" action="/">
            <label for="name">Insert your name</label>
            <input type="text" name="name" id="name"/>
            <label for="message">Write your post</label>
            <textarea name="message" id="message"></textarea>
            <button type="submit">Post</button>
        </form>
        </body>
    </html>`;
  res.send(content);
});

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


