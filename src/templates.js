function sanitize(str) {
  return str.replace(/</g, "&lt;");
}

function validation(nameError, messageError) {
  if (message) {
    return `<span style="color: red">${message}</span>`;
  } else {
    return "";
  }
}


function home(posts, nameError = false, messageError = false) {
  const title = "All posts";
  const content = /*html*/ `
    <h2>New post</h2>
    <form method="POST">
      <p>
        <label for="nickname">Nickname</label>
        <input id="nickname" name="nickname">
        ${nameError ? `<span>Please don't leave this field empty</span>` : ""}
      </p>
      <p>
        <label for="message">Message</label>
        <textarea id="message" name="message"></textarea>
         ${
           messageError
             ? "<span>Please don't leave this field empty</span>"
             : ""
         }
      </p>
      <button>Send</button>
    </form>
    <h2>All posts</h2>
    <ul>
      ${posts.map(postItem).join("")}
    </ul>
  `;
  return layout(title, content);
}

module.exports = {
  sanitize,
  validation,
};
