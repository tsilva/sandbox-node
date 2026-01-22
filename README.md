<div align="center">
  <img src="logo.png" alt="sandbox-node" width="512"/>

  [![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Dev Container](https://img.shields.io/badge/Dev%20Container-Ready-blue?logo=docker&logoColor=white)](https://containers.dev/)

  **A ready-to-use Node.js Express sandbox for rapid prototyping and experimentation**

  [Quick Start](#quick-start) · [API Reference](#api-endpoints) · [Development](#development)
</div>

---

## Overview

sandbox-node provides a pre-configured Node.js development environment that runs in a Dev Container. It's designed for rapid prototyping, learning Express.js, and experimenting with Node.js features without the hassle of environment setup.

## Features

- **Zero Configuration** - Works out of the box with sensible defaults
- **Dev Container Ready** - Consistent development environment across machines
- **Hot Reloading** - Automatic server restart on file changes with nodemon
- **Environment Variables** - Built-in dotenv support for configuration
- **Testing Ready** - Jest pre-configured for unit testing

## Quick Start

### Option 1: Dev Container (Recommended)

1. Open this repository in VS Code
2. When prompted, click **"Reopen in Container"**
3. Start the development server:

```bash
npm run dev
```

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/tsilva/sandbox-node.git
cd sandbox-node

# Install dependencies
npm install

# Start the development server
npm run dev
```

The server starts at `http://localhost:3000`.

## API Endpoints

### GET /

Returns a welcome message.

**Response:**

```json
{
  "message": "Welcome to the Node.js sandbox!"
}
```

## Development

### Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm start` | Run the server in production mode |
| `npm run dev` | Run with hot-reloading (nodemon) |
| `npm test` | Run Jest tests |

### Environment Variables

Create a `.env` file in the root directory to configure the application:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | - | Environment (development/production) |

### Project Structure

```
sandbox-node/
├── src/
│   └── index.js        # Express application entry point
├── .devcontainer/      # Dev Container configuration
├── .env.example        # Example environment variables
└── package.json        # Project dependencies and scripts
```

## Prerequisites

For Dev Container usage:
- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

For local development:
- [Node.js](https://nodejs.org/) 18+
- npm

## License

MIT
