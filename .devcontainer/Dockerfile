FROM ubuntu:22.04

# Create non-root user
RUN groupadd --gid 1000 node \
    && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

# Install curl and basic dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install NVM
ENV NVM_DIR /usr/local/nvm
RUN mkdir -p $NVM_DIR && chown node:node $NVM_DIR

USER node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Load NVM and install Node.js
SHELL ["/bin/bash", "-c"]
RUN source $NVM_DIR/nvm.sh \
    && nvm install node \
    && nvm alias default node \
    && nvm use default \
    && echo "source $NVM_DIR/nvm.sh" >> ~/.bashrc \
    && echo "nvm use default" >> ~/.bashrc

WORKDIR /workspace