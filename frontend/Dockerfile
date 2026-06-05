FROM node:20-alpine AS build

WORKDIR /app

# create user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# switch to user
USER appuser

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
