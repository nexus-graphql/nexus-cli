const { readFileSync, writeFileSync } = require("fs");
const pkg = require("js-yaml");
const { v4: uuidv4 } = require("uuid");
const postgresTemplate = require("../templates/postgres.js");
const graphqlTemplate = require("../templates/graphql.js");
const openapiTemplate = require("../templates/openapi.js");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { env } = require("process");

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

const addTypeDef = (typeDef) => {
  let envJSON = JSON.parse(readFileSync(envPath));

  if (!envJSON.additionalTypeDefs) {
    envJSON.additionalTypeDefs = {};
  }

  const key = `${typeDef.newField}${typeDef.extendType}`;
  envJSON.additionalTypeDefs[key] = typeDef;

  writeAdditionalTypeDefs(envJSON.additionalTypeDefs);

  writeFileSync(envPath, JSON.stringify(envJSON), "utf8");
};

const removeTypeDef = (id) => {
  let envJSON = JSON.parse(readFileSync(envPath));

  delete envJSON.additionalTypeDefs[id];

  writeAdditionalTypeDefs(envJSON.additionalTypeDefs);

  writeFileSync(envPath, JSON.stringify(envJSON), "utf8");
};

const typeDefTemplate = ({
  extendType,
  newField,
  newFieldType,
  source,
  filterField,
  extendTypeField,
}) => {
  const typeDef = `extend type ${extendType} {
  ${newField}: ${newFieldType}
}`;

  const resolver = {
    targetTypeName: extendType,
    targetFieldName: newField,
    sourceName: source,
    sourceTypeName: "Query",
    sourceFieldName: `all${newFieldType}sList`,
    keyField: `${extendTypeField}`,
    keysArg: `filter.${filterField}.in`,
  };

  return { typeDef, resolver };
};

const writeAdditionalTypeDefs = (typeDefs) => {
  const meshrc = load(readFileSync(meshrcPath));

  let typeDefsString = "";
  const resolvers = [];

  Object.keys(typeDefs).forEach((key, index) => {
    const template = typeDefTemplate(typeDefs[key]);

    if (index === 0) {
      typeDefsString += `${template.typeDef}`;
    } else {
      typeDefsString += `\n${template.typeDef}`;
    }

    resolvers.push(template.resolver);
  });

  meshrc.additionalTypeDefs = typeDefsString;
  meshrc.additionalResolvers = resolvers;

  writeFileSync(meshrcPath, dump(meshrc), "utf8");
};

const getPostgresDataSourceNames = () => {
  const meshrc = load(readFileSync(meshrcPath));
  let names = [];
  meshrc.sources.forEach((dataSource) => {
    if (dataSource.handler.postgraphile) {
      names.push(dataSource.name);
    }
  });
  return names;
};

const loadSchemas = () => {
  const names = getPostgresDataSourceNames();
  let schemas = {};
  names.forEach((name) => {
    schemas[name] = loadSchemaSync(
      `${userDirectory}/.mesh/sources/${name}/schema.graphql`,
      {
        loaders: [new GraphQLFileLoader()],
      }
    );
  });
  return schemas;
};

const getSchemas = () => {
  let schemas = loadSchemas();
  let result = {};
  for (const name in schemas) {
    let schema = schemas[name];
    let queryFields = Object.keys(schema._queryType._fields);
    queryFields = queryFields
      .filter((field) => {
        return !["query", "nodeId", "node"].includes(field);
      })
      .map((field) => {
        return field.slice(0, 1).toUpperCase() + field.slice(1);
      });

    // filter schema._typeMap by whether or not the current key is included queryFields
    let types = [];
    for (const key in schema._typeMap) {
      if (queryFields.includes(key)) {
        types.push(key);
      }
    }

    let obj = {};
    types.forEach((type) => {
      let fields = Object.keys(schema._typeMap[type]._fields).filter((key) => {
        return key !== "nodeId" && !key.match(/.+By.+Id.*/);
      });
      obj[type] = fields;
    });
    result[name] = obj;
  }
  return result;
};

const getTypeDefs = () => {
  let envJSON = JSON.parse(readFileSync(envPath));

  const typeDefs = {};
  getPostgresDataSourceNames().forEach((name) => {
    typeDefs[name] = [];
  });

  if (!envJSON.additionalTypeDefs) {
    envJSON.additionalTypeDefs = {};
  }

  Object.keys(envJSON.additionalTypeDefs).forEach((key) => {
    const typeDef = envJSON.additionalTypeDefs[key];
    typeDefs[typeDef.extendSource].push(typeDef);
  });

  return typeDefs || [];
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
  addTypeDef,
  removeTypeDef,
  getSchemas,
  getTypeDefs,
};
