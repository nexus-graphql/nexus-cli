const { readFileSync, writeFileSync } = require("fs");
const pkg = require("js-yaml");
const { v4: uuidv4 } = require("uuid");
const postgresTemplate = require("../templates/postgres.js");
const graphqlTemplate = require("../templates/graphql.js");
const openapiTemplate = require("../templates/openapi.js");

const { load, dump } = pkg;
const userDirectory = process.argv[2];
const meshrcPath = `${userDirectory}/.meshrc.yaml`;
const envPath = `${userDirectory}/env.json`;

const getAuthorization = () => {
  let envJSON = JSON.parse(readFileSync(envPath));
  return envJSON.ADMIN_SECRET;
};

const resetAuthorization = () => {
  const adminSecret = uuidv4();

  let envJSON = JSON.parse(readFileSync(envPath));
  envJSON.ADMIN_SECRET = adminSecret;
  writeFileSync(envPath, JSON.stringify(envJSON), "utf8");

  return adminSecret;
};

const addDataSource = ({ type, name, connection }) => {
  const meshrc = load(readFileSync(meshrcPath, "utf8"));
  let template;

  switch (type) {
    case "postgres":
      template = JSON.parse(JSON.stringify(postgresTemplate));
      template.handler.postgraphile.connectionString = connection;
      break;
    case "graphql":
      template = JSON.parse(JSON.stringify(graphqlTemplate));
      template.handler.graphql.endpoint = connection;
      break;
    case "rest":
      template = JSON.parse(JSON.stringify(openapiTemplate));
      template.handler.openapi.source = connection;
      break;
  }

  template.name = name;
  meshrc.sources.push(template);

  writeFileSync(meshrcPath, dump(meshrc), "utf8");
};

const deleteDataSource = (name) => {
  const meshrc = load(readFileSync(meshrcPath, "utf8"));
  meshrc.sources = meshrc.sources.filter((source) => source.name !== name);
  writeFileSync(meshrcPath, dump(meshrc), "utf8");
};

const updateDataSource = ({ name, newName, connection }) => {
  const meshrc = load(readFileSync(meshrcPath, "utf8"));

  source = meshrc.sources.find((source) => source.name === name);

  if (newName) {
    source.name = newName;
  }

  if (source.handler.postgraphile) {
    source.handler.postgraphile.connectionString = connection;
  } else if (source.handler.graphql) {
    source.handler.graphql.endpoint = connection;
  } else if (source.handler.openapi) {
    source.handler.openapi.source = connection;
  }

  writeFileSync(meshrcPath, dump(meshrc), "utf8");
};

const getDataSources = () => {
  const meshrc = load(readFileSync(`${userDirectory}/.meshrc.yaml`, "utf8"));

  const transformedSources = meshrc.sources.map((source, index) => {
    const newSource = { name: source.name };
    if (source.handler.postgraphile) {
      newSource.type = "postgres";
      newSource.connection = source.handler.postgraphile.connectionString;
    } else if (source.handler.graphql) {
      newSource.type = "graphql";
      newSource.connection = source.handler.graphql.endpoint;
    } else if (source.handler.openapi) {
      newSource.type = "rest";
      newSource.connection = source.handler.openapi.source;
    }
    return newSource;
  });

  return transformedSources;
};

const getLocalChanges = () => {
  let envJSON = JSON.parse(readFileSync(envPath));
  return envJSON.localChanges;
};

const setLocalChanges = (bool) => {
  let envJSON = JSON.parse(readFileSync(envPath));
  envJSON.localChanges = bool;
  writeFileSync(envPath, JSON.stringify(envJSON), "utf8");
  return bool;
};

module.exports = {
  getAuthorization,
  resetAuthorization,
  getDataSources,
  addDataSource,
  deleteDataSource,
  updateDataSource,
  getLocalChanges,
  setLocalChanges,
};
