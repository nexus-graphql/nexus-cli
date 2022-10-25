export default {
  string:
    `FROM node:18
WORKDIR /usr/src/server
COPY package*.json ./
COPY .meshrc.yaml ./
RUN npm i
RUN npx mesh build
EXPOSE 4000
CMD [ "npx", "mesh", "start"]
`
};

