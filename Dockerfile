# ---- Base Node ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# ---- Copy Build Artifacts ----
COPY .next ./.next
COPY public ./public
COPY .env ./



EXPOSE 3000
CMD ["npm", "start"]

