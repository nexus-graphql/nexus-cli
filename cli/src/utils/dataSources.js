import pkg from "js-yaml";
import { readFileSync, writeFileSync } from "fs";
import { cwd } from "process";
import graphqlTemplate from "../configTemplates/graphql.js";
import postgresTemplate from "../configTemplates/postgres.js";
import openapiTemplate from "../configTemplates/openapi.js";

const { load, dump } = pkg;

export const addGraphqlSourceToConfig = (name, endpoint) => {
  const template = JSON.parse(JSON.stringify(graphqlTemplate));
  const config = load(readFileSync(`${cwd()}/.meshrc.yaml`, "utf8"));

  template.name = name;
  template.handler.graphql.endpoint = endpoint;

  config.sources.push(template);

  writeFileSync(`${cwd()}/.meshrc.yaml`, dump(config), "utf8");
};

export const addPostgresSourceToConfig = (name, connectionString) => {
  const template = JSON.parse(JSON.stringify(postgresTemplate));
  const config = load(readFileSync(`${cwd()}/.meshrc.yaml`, "utf8"));

  template.name = name;
  template.handler.postgraphile.connectionString = connectionString;

  config.sources.push(template);

  writeFileSync(`${cwd()}/.meshrc.yaml`, dump(config), "utf8");
};

export const addOpenapiSourceToConfig = (name, source) => {
  const template = JSON.parse(JSON.stringify(openapiTemplate));
  const config = load(readFileSync(`${cwd()}/.meshrc.yaml`, "utf8"));
  template.name = name;
  template.handler.openapi.source = source;

  config.sources.push(template);
  writeFileSync(`${cwd()}/.meshrc.yaml`, dump(config), "utf8");
};
