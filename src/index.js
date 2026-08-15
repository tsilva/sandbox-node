require("dotenv").config();
const express = require("express");

function randomPortValue(value) {
  return value === "auto" ? 0 : value;
}

function readPort(argv = process.argv, env = process.env) {
  const portArgIndex = argv.findIndex((arg) => arg === "--port" || arg === "-p");
  const argPort = portArgIndex === -1 ? undefined : argv[portArgIndex + 1];
  const inlinePort = argv.find((arg) => arg.startsWith("--port=") || arg.startsWith("-p="));
  const requestedPort = argPort ?? inlinePort?.split("=")[1] ?? env.PORT ?? "3000";
  const port = Number(randomPortValue(requestedPort));

  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid port: ${requestedPort}`);
  }

  return port;
}

function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Node.js sandbox!" });
  });

  return app;
}

function startServer(port = readPort()) {
  const server = createApp().listen(port, () => {
    const address = server.address();
    const actualPort = address && typeof address !== "string" ? address.port : port;
    console.log(`Server is running on http://localhost:${actualPort}`);
  });

  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = { createApp, readPort, startServer };
