FROM node:10-alpine

WORKDIR /app
COPY . /app

RUN yarn

EXPOSE 4646
CMD ["node", "src/index.js"]
