# ======================
# STAGE 1: BUILD
# ======================
FROM node:20-alpine AS build

WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm ci

# copy source code
COPY . .

# IMPORTANT: backend URL passed from docker-compose
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# build React app (env is baked here)
RUN npm run build


# ======================
# STAGE 2: RUNTIME (NGINX)
# ======================
FROM nginx:stable-alpine

# install curl for healthcheck
RUN apk update && apk upgrade --no-cache \
    && apk add --no-cache curl

# create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# copy build output
COPY --from=build /app/build /usr/share/nginx/html

# fix permissions
RUN chown -R appuser:appgroup /usr/share/nginx/html \
    && chown -R appuser:appgroup /var/cache/nginx \
    && chown -R appuser:appgroup /var/log/nginx \
    && mkdir -p /var/run/nginx \
    && chown -R appuser:appgroup /var/run/nginx

USER appuser

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]
