const express = require("express");
const { sanitize, validation } = require("./templates.js");

const bodyParser = express.urlencoded();

const server = express();

const posts = [
  {
    name: "Abby",
    message: "Abby is the BOSS!",
    date: "02/26/2022",
  },
];

server.get("/", (req, res) => {
  const postList = posts.map((post) => {
    return `
    <div>
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
        ${postList} 
        </body>
    </html>`;
  res.send(content);
});

server.post("/", bodyParser, (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const date = Date();
  let nameError = false;
  let messageError = false;
  if (name.trim() === "" || message.trim() === "") {
    const postList = posts.map((post) => {
      return `
      <div>
      <h2>${sanitize(post.name)}</h2>
      <p>${sanitize(post.message)}</p>
      <p>${post.date}</p>
      </div>`;
    });
    nameError = true;
    messageError = true;
    res.status(400).send(`<!DOCTYPE html>
    <html>
        <head>
        <meta charset="utf-8">
        <title>Home</title>
        </head>
        <body>
        <h1>Micro Blog</h1>
        <form method="POST" action="/">
            <label for="name">Insert your name</label>
            <input type="text" name="name" id="name" required/>
            ${nameError ? `<span>Please write your name</span>` : ""}
            <label for="message">Write your post</label>
            ${messageError ? `<span>Please write your name</span>` : ""}
            <textarea name="message" id="message" required></textarea>
            <button type="submit">Post</button>
        </form>
        ${postList} 
        </body>
    </html>`);
  } else {
    posts.push({ name, message, date });
    res.redirect("/");
  }
});

module.exports = server;
