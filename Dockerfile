FROM node:boron

ARG port=8080

EXPOSE $port

ENV PORT $port

WORKDIR /app
COPY . ./

RUN npm install --production

CMD ["npm", "start"]
