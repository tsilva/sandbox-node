const assert = require("node:assert/strict");
const { after, test } = require("node:test");

const { readPort, startServer } = require("../src/index");

test("automatic ports resolve to an ephemeral listener", () => {
  assert.equal(readPort(["node", "src/index.js", "--port", "auto"], {}), 0);
});

test("invalid ports are rejected", () => {
  assert.throws(
    () => readPort(["node", "src/index.js", "--port", "../../admin"], {}),
    /Invalid port/,
  );
});

test("the server starts and returns the documented response", async () => {
  const server = startServer(0);
  after(() => server.close());

  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });

  const address = server.address();
  assert.ok(address && typeof address !== "string");

  const response = await fetch(`http://127.0.0.1:${address.port}/`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-powered-by"), null);
  assert.deepEqual(await response.json(), {
    message: "Welcome to the Node.js sandbox!",
  });
});
