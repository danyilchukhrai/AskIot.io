# ---- Base Node ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm install --only=production 
# Copy over node modules from above to a directory that's expected to have production node_modules only
COPY node_modules node_modules
RUN npm install

# ---- Build ----
FROM dependencies AS build
COPY . .
RUN npm run build

# --- Release ----
FROM base AS release
# Copy production node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
# Copy build artifacts from build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
