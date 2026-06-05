# ======================
# STAGE 1: BUILD
# ======================
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


# ======================
# STAGE 2: RUNTIME
# ======================
FROM nginx:stable-alpine

# install security updates + curl for healthcheck
RUN apk update && apk upgrade --no-cache \
    && apk add --no-cache curl

# create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# nginx setup
RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

# permissions
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
