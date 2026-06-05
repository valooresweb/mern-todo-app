FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy source
COPY . .

# Create non-root user (security fix)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Fix permissions
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 5000

# Healthcheck (IMPORTANT for Trivy)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8000 || exit 1

CMD ["npm", "start"]
