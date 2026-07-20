require("dotenv").config();
const express = require("express");

function randomPortValue(value) {
  return value === "auto" ? 0 : value;
}

function readPort() {
  const portArgIndex = process.argv.findIndex((arg) => arg === "--port" || arg === "-p");
  const argPort = portArgIndex === -1 ? undefined : process.argv[portArgIndex + 1];
  const inlinePort = process.argv.find((arg) => arg.startsWith("--port=") || arg.startsWith("-p="));
  const requestedPort = argPort ?? inlinePort?.split("=")[1] ?? process.env.PORT ?? "3000";
  const port = Number(randomPortValue(requestedPort));

  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid port: ${requestedPort}`);
  }

  return port;
}

const app = express();
const port = readPort();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Node.js sandbox!" });
});

const server = app.listen(port, () => {
  const address = server.address();
  const actualPort = address && typeof address !== "string" ? address.port : port;
  console.log(`Server is running on http://localhost:${actualPort}`);
});
