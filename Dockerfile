# Stage 1: Build
FROM node:22-bookworm AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# 🔑 Make the var available at build time
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

RUN npx prisma generate
# Make sure the var is present for the build command
RUN NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL} npm run build

# Stage 2: Production
FROM node:22-bookworm
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["npm", "start"]
