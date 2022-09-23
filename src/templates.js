
function sanitize(str) {
  return str.replace(/</g, "&lt;");
}

//html form, including validation for name and message and postList
const content = (validator, values,  postList) => {
  return `
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width">
        <meta charset="utf-8">
          <title>Home</title>
          <link rel="stylesheet" href="style.css">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Poppins:wght@200&display=swap" rel="stylesheet">
          </head>
          <body>
            <header class="main-header">
              <h1>Gebloggt</h1>
            </header>
            <main class="main">
              <form method="POST" action="/" class="submit-form">
                <label for="name">Insert your name</label>
                <input type="text" name="name" class="name-input" id="name" value="${
                  values.name
                }" />
                ${
                  validator.name
                    ? `<span class="error">Please write your name</span>`
                    : ""
                }
                <label for="message">Write your post</label>
                <textarea name="message" class="message" id="message" >${
                  values.message
                }</textarea>
                ${
                  validator.message
                    ? `<span class="error">Please write your message</span>`
                    : ""
                }
                <button type="submit" class="btn">Post</button>
              </form>
              <ul>
                ${postList.join("")}
              </ul>
            </main>
            <footer>
              <p>@2022 Abby-Abdullah-Karwan-Lsa</p>
            </footer>
          </body>
        </html>`;
};

module.exports = {
  sanitize,
  content,
};
