const e = require("express");
const express = require("express");
const { sanitize, validation } = require("./templates.js");

const bodyParser = express.urlencoded();

const server = express();

const staticHandler = express.static("public");
server.use(staticHandler);

//dummy data
const posts = [
  {
    id: 1,
    name: "Abby",
    message: "Abby is the BOSS!",
    date: "02/26/2022",
    like: 0,
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
  //mapping through posts and adding date and sanitized name and message
  const postList = posts.map((post) => {
    return `
    <form class="post-block" method="POST" action="/delete/${post.id}">
    <h2>${sanitize(post.name)}</h2>
    <p>${sanitize(post.message)}</p>
    <p>${post.date}</p>
    <p>Likes:${post.like}</p>
    <button type="submit">Delete</button>
    </form > 
    <form class="post-block" method="POST" action="/likes/${post.id}">
    <button type="submit">Like</button>
    </form>`;
  });

  //html form, including validation for name and message and postList
  const content = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width">
          <meta charset="utf-8">
            <title>Home</title>
            <link rel="stylesheet" href="style.css">
            </head>
            <body>
              <header class="main-header">
                <h1>Micro Blog</h1>
              </header
        <main>
                <form method="POST" action="/">
                  <label for="name">Insert your name</label>
                  <input type="text" name="name" id="name" value="${
                    values.name
                  }" />
                  ${validator.name ? `<span>Please write your name</span>` : ""}
                  <label for="message">Write your post</label>
                  <textarea name="message" id="message" >${
                    values.message
                  }</textarea>
                  ${
                    validator.message
                      ? `<span>Please write your message</span>`
                      : ""
                  }
                  <button type="submit" class="btn">Post</button>
                </form>
                <ul>
                  ${postList}
                </ul>
              </main>
            </body>
          </html>`;
  res.send(content);
});

server.post("/delete/:id", bodyParser, (req, res) => {
  const id = req.params.id;
  posts.map((post) => {
    if (post.id === +id) {
      posts.splice(id - 1, 1);
    }
  });
  res.redirect("/");
});

server.post("/likes/:id", bodyParser, (req, res) => {
  const likes = req.params.id;
  posts.map((post) => {
    if (post.id === +likes) {
      post.like =  post.like +1;
    }
  });
  res.redirect("/");
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
    posts.push({
      id: posts.length === 0 ? 1 : posts[posts.length - 1].id + 1,
      name,
      message,
      date,
      like: 0,
    });
  }
  res.redirect("/");
});

server.use((req, res) => {
  res.status(404).send(`<h1>Opps 404!</h1>`);
});

module.exports = server;
