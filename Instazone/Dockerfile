FROM ubuntu:22.04

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy environment file
COPY .env .env

# Copy package files
COPY package.json package-lock.json ./

# Install npm dependencies
RUN npm install

# Copy source code
COPY src ./src

# Expose port
EXPOSE 4000

# Entry point
ENTRYPOINT [ "node", "src/index.js" ]
