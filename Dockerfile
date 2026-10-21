FROM node:22-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN mkdir /data && chown node:node /data
USER node
ENV DB_PATH=/data/wohnheim.db
EXPOSE 3000
CMD ["npm", "start"]