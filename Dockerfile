# syntax=docker/dockerfile:1

FROM ubuntu:20.04 AS base

WORKDIR /app

FROM base AS installer_bun

RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    ca-certificates \
    && apt-get clean

RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.1.21"

FROM base AS install_deps

# Copy the current directory contents into the container
COPY . .
COPY --from=installer_bun /root/.bun/bin/bun /usr/local/bin/bun

# Install all package dependencies
RUN HUSKY=0 bun install --frozen-lockfile

FROM base AS build

COPY . .
COPY --from=install_deps /app/node_modules ./node_modules
COPY --from=installer_bun /root/.bun/bin/bun /usr/local/bin/bun

# Set the environment variable
ENV NODE_ENV=production

# Run the build command
RUN bun run build

FROM base AS typecheck
COPY . .
COPY --from=install_deps /app/node_modules ./node_modules
COPY --from=installer_bun /root/.bun/bin/bun /usr/local/bin/bun
COPY --from=installer_bun /root/.bun/bin/bunx /usr/local/bin/bunx

RUN bun i --global vue-tsc
RUN HUSKY=0 bun run typecheck

FROM base AS development

COPY . .
COPY --from=installer_bun /root/.bun/bin/bun /usr/local/bin/bun
COPY --from=installer_bun /root/.bun/bin/bunx /usr/local/bin/bunx

# Install git for bun install to work in development
RUN apt-get update && apt-get install -y git \
    && apt-get clean

# Set the environment variable
ENV NODE_ENV=development

EXPOSE 3000

FROM base AS production

# Create a non-root user and group
RUN groupadd -r appgroup && useradd -r -g appgroup -d /app -s /sbin/nologin appuser

COPY --from=installer_bun /root/.bun/bin/bun /usr/local/bin/bun

# Remove unnecessary packages
RUN rm -rf /var/lib/apt/lists/*

# Set the environment variable
ENV NODE_ENV=production

# Copy the output from the build stage
COPY --from=build /app/.output .

# Change ownership of /app directory to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Command to run the application
CMD ["bun", "server/index.mjs"]

# Expose the port the app runs on
EXPOSE 3000