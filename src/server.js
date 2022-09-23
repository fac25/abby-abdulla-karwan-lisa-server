const express = require("express");
const { sanitize, content } = require("./templates.js");

const {posts} = require("./data")

const bodyParser = express.urlencoded();

const server = express();

const staticHandler = express.static("public");
server.use(staticHandler);


const values = {
  name: "",
  message: "",
};

const validator = {
  name: false,
  message: false,
};

server.get("/", (req, res) => {
  //mapping through posts and adding date and sanitized name and message
  const postList = posts.reverse().map((post) => {
    return `
    <li class="post-block">
    <form method="POST" action="/likes/${post.id}">
    <h2>${sanitize(post.name)}</h2>
    <p class="post-message">${sanitize(post.message)}</p>
    <p>${post.date}</p>
    <p>Likes:${post.like}</p>
    <button id= "like" class="like" type="submit">Like</button>
    </form > 
    <form method="POST" action="/delete/${post.id}">
    <button class="delete" type="submit">Delete</button>
    </form>
    </li>`;
  });
  res.send(content(validator, values, postList));
});

server.post("/delete/:id", bodyParser, (req, res) => {
  const id = req.params.id;
  posts.reverse().map((post) => {
    if (post.id === +id) {
      posts.splice(id - 1, 1);
    }
  });
  res.redirect("/");
});

server.post("/likes/:id", bodyParser, (req, res) => {
  const likes = req.params.id;
  posts.reverse().map((post) => {
    if (post.id === +likes) {
      post.like = post.like + 1;
    }
  });
  res.redirect("/");
});

server.post("/", bodyParser, (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const date = new Date().toLocaleDateString("en-GB");

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
    posts.reverse().push({
      id: posts.length === 0 ? 1 : posts[posts.length - 1].id + 1,
      name,
      message,
      date,
      like: 0,
    });
    validator.message = false;
    validator.name = false;
  }
  res.redirect("/");
});

server.use((req, res) => {
  res.status(404).send(`<h1>Opps 404!</h1>`);
});

module.exports = { server };
