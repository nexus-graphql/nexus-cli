export default (port) => `FROM node:18
WORKDIR /usr/src/server
COPY package*.json ./
COPY . .
RUN npm i
RUN npx mesh build
EXPOSE ${port}
CMD [ "npx", "mesh", "start"]
`;
