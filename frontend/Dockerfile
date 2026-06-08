# ======================
# STAGE 1: BUILD
# ======================
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm run build


# ======================
# STAGE 2: RUNTIME
# ======================
FROM nginx:stable-alpine

RUN apk update && apk upgrade --no-cache \
    && apk add --no-cache curl

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

RUN chown -R appuser:appgroup /usr/share/nginx/html \
    && chown -R appuser:appgroup /var/cache/nginx \
    && chown -R appuser:appgroup /var/log/nginx

# IMPORTANT FIX:
# Run nginx as root to avoid /run/nginx.pid permission error
# USER appuser   <-- DO NOT USE

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]
