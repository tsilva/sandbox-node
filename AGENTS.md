# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js Express server sandbox project designed to run in a Dev Container environment. The codebase is minimal and straightforward, with a single Express server entry point.

## Development Commands

- `pnpm install --frozen-lockfile` - Install the committed dependency graph (automatically runs via postCreateCommand in Dev Container)
- `pnpm start` - Run the server in production mode
- `pnpm dev` - Run with Node's built-in watch mode
- `pnpm check` - Check JavaScript syntax
- `pnpm test` - Run the built-in Node.js test suite

## Architecture

### Application Structure

- **src/index.js** - Main Express application entry point. Configures dotenv, sets up Express middleware (JSON parsing), defines routes, and starts the server.
- **.devcontainer/** - Dev Container configuration for VS Code
  - Automatically installs dependencies on container creation
  - Forwards port 3000 for local development
  - Includes ESLint, Prettier, and GitHub extensions

### Configuration

- Environment variables are loaded via dotenv from `.env` file
- Server port defaults to 3000 if PORT environment variable is not set
- Example configuration in `.env.example` shows PORT and NODE_ENV options

## Key Constraints

- **README.md must be kept up to date** with any significant project changes

## Dev Container

This project is designed to run in a VS Code Dev Container. When the container builds, it automatically enables Corepack and runs `pnpm install --frozen-lockfile`. The server can be accessed on port 3000, which is automatically forwarded to the host.
