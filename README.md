# sandbox-nodejs

A simple Node.js Express server sandbox project designed to run in a Dev Container.

## Prerequisites

- Visual Studio Code
- Docker Desktop
- VS Code Remote - Containers extension

## Quick Start

1. Open this repository in VS Code
2. When prompted, click "Reopen in Container".
3. After the container builds and starts, open a terminal and run:
   ```bash
   node src/index.js
   ```

The server will start on port 3000 (default).

## Environment Variables

Create a `.env` file in the root directory (optional):

```
PORT=3000
```

## API Endpoints

### GET /

Returns a welcome message

**Response:**

```json
{
  "message": "Welcome to the Node.js sandbox!"
}
```

## Development

The project is configured to run in a Dev Container, which provides a consistent development environment with all necessary dependencies pre-installed.

### Container Features

- Node.js runtime
- Git
- Common Node.js development tools
