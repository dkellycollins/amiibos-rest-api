FROM node:boron

ARG port=8080
EXPOSE $port
ENV PORT $port

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production

COPY . ./

CMD ["npm", "start"]
