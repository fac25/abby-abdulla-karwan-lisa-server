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

module.exports = {
  sanitize,
  validation,
};
