# ======================
# STAGE 1: BUILD
# ======================
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# ======================
# STAGE 2: PRODUCTION (NGINX)
# ======================
FROM nginx:1.27-alpine

# remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# copy your custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# copy build output
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]
