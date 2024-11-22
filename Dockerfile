# syntax=docker/dockerfile:1

###########################################
# BASE IMAGE
###########################################
FROM node:20.16 AS base

WORKDIR /app

ARG BUN_VERSION="1.1.36"
ENV HUSKY_SKIP_INSTALL=1
ENV HUSKY=0

RUN npm i -g bun@"$BUN_VERSION"

###########################################
# Development Image
###########################################
FROM base AS development

# copy project
COPY . .

# Install git for bun install to work in development
RUN apt-get update && apt-get install -y git && apt-get clean
