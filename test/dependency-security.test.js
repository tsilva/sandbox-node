const assert = require("node:assert/strict");
const { createRequire } = require("node:module");
const { gzipSync } = require("node:zlib");
const test = require("node:test");
const { createApp } = require("../src/index");

test("compressed JSON remains supported and malformed trailing bytes leave the server healthy", { timeout: 5000 }, async (t) => {
  const app = createApp();
  app.post("/body-fixture", (req, res) => res.json(req.body));
  app.use((error, _req, res, _next) => res.status(error.status || 500).end());
  const server = app.listen(0, "127.0.0.1");
  t.after(() => { server.closeAllConnections(); server.close(); });
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  const body = gzipSync(JSON.stringify({ message: "small offline fixture" }));
  const request = (value) => fetch(`${base}/body-fixture`, {
    method: "POST", body: value,
    headers: { "content-type": "application/json", "content-encoding": "gzip" },
    signal: AbortSignal.timeout(2000),
  });
  const valid = await request(body);
  assert.equal(valid.status, 200);
  assert.deepEqual(await valid.json(), { message: "small offline fixture" });
  const malformed = await request(Buffer.concat([body, Buffer.from("invalid trailing bytes")]));
  assert.equal(malformed.status, 400);
  const healthy = await fetch(base, { signal: AbortSignal.timeout(2000) });
  assert.equal(healthy.status, 200);
  assert.deepEqual(await healthy.json(), { message: "Welcome to the Node.js sandbox!" });
});

test("Express's qs dependency handles comma arrays with non-callable toString values", () => {
  const expressRequire = createRequire(require.resolve("express/package.json"));
  const qs = expressRequire("qs");
  assert.equal(qs.stringify({ a: ["x", "y"] }, { arrayFormat: "comma" }), "a=x%2Cy");
  for (const encodeValuesOnly of [false, true]) {
    const value = JSON.parse('{"a":[{"toString":"x"}]}');
    assert.equal(typeof qs.stringify(value, { arrayFormat: "comma", encodeValuesOnly }), "string");
  }
});
