
# Stage 1: Build the app
FROM node:20-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Stage 2: Serve the app
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
RUN npm install -g prisma nodemon ts-node
COPY --from=builder /usr/src/app/prisma ./prisma/
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
