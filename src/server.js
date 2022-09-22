const express = require("express");
const { sanitize, validation } = require("./templates.js");

const bodyParser = express.urlencoded();

const server = express();

const staticHandler = express.static("../public");
server.use(staticHandler);

const posts = [
  {
    name: "Abby",
    message: "Abby is the BOSS!",
    date: "02/26/2022",
  },
];

const values = {
  name: "",
  message: "",
};

const validator = {
  name: false,
  message: false,
};

server.get("/", (req, res) => {
  const postList = posts.map((post) => {
    return `
    <div class="post-block">
    <h2>${sanitize(post.name)}</h2>
    <p>${sanitize(post.message)}</p>
    <p>${post.date}</p>
    </div>`;
  });

  const content = `<!DOCTYPE html>
    <html>
        <head>
        <meta charset="utf-8">
        <title>Home</title>
        <link rel="stylesheet" href="style.css">
        </head>
        <body>
        <h1>Micro Blog</h1>
        <form method="POST" action="/">
            <label for="name">Insert your name</label>
            <input type="text" name="name" id="name" value="${values.name}"/>
            ${validator.name ? `<span>Please write your name</span>` : ""}
            <label for="message">Write your post</label>
            <textarea name="message" id="message" >${values.message}</textarea>
            ${validator.message ? `<span>Please write your message</span>` : ""}
            <button type="submit" id="post-btn">Post</button>
        </form>
        ${postList} 
        </body>
    </html>`;
  res.send(content);
});

server.post("/", bodyParser, (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const date = Date();

  if (!name.trim() && !message.trim()) {
    validator.name = true;
    validator.message = true;
  } else if (!name.trim()) {
    values.message = message;
    values.name = "";
    validator.name = true;
    validator.message = false;
  } else if (!message.trim()) {
    values.name = name;
    values.message = "";

    validator.message = true;
    validator.name = false;
  } else {
    values.name = "";
    values.message = "";
    posts.push({ name, message, date });
  }
  res.redirect("/");
});

server.use((req, res) => {
  res.send(`<h1>Opps 404!</h1>`);
});

module.exports = server;
