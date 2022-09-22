const test = require("node:test");
const assert = require("node:assert");
const server = require("../src/server.js");

test("if the test works", () => {
    assert.equal(1, 1)
});

test("home route returns expected page", async () => {
    const app = server.listen(9876);
    const response = await fetch("http://localhost:9876");
    app.close();

    assert.equal(response.status, 200);
    const body = await response.text();
    assert.match(body, /Gebloggt/);
});

test("error route response", async () => {
    const app = server.listen(3002);
    const response = await fetch("http://localhost:3002/eeffewno");
    app.close();

    assert.equal(response.status, 404)
    const body = await response.text();
    assert.match(body, /Opps 404!/);
})

test("post is posting and post the right info", async () => {
    const app = server.listen(3005);
    const response = await fetch("http://localhost:3005", {
        method: "POST",
        body: `name=lisa&message=hello`,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    })
    app.close();
    assert.equal(response.status, 200)
    const body = await response.text();
    assert.match(body, /lisa/);
    assert.match(body, /message/);  
})
