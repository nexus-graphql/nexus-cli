import pkg from "js-yaml"; // not configured for es6 modules, so can't destructure?
const { load, dump } = pkg;
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { cwd } from "process";
import baseTemplate from "../../configTemplates/base.js";
import graphqlTemplate from "../../configTemplates/graphql.js";
import postgresTemplate from "../../configTemplates/postgres.js";

export const createMeshConfig = (name, connectionString) => {
  const template = JSON.parse(JSON.stringify(baseTemplate));
  template.sources[0].name = name;
  template.sources[0].handler.postgraphile.connectionString = connectionString;

  writeFileSync(cwd() + "/.meshrc.yaml", dump(template), "utf8");
};

export const addGraphqlSourceToConfig = (name, endpoint) => {
  const template = JSON.parse(JSON.stringify(graphqlTemplate));
  const config = load(readFileSync(cwd() + "/.meshrc.yaml", "utf8"));

  template.name = name;
  template.handler.graphql.endpoint = endpoint;

  config.sources.push(template);

  writeFileSync(cwd() + "/.meshrc.yaml", dump(config), "utf8");
};

export const addPostgresSourceToConfig = (name, connectionString) => {
  const template = JSON.parse(JSON.stringify(postgresTemplate));
  const config = load(readFileSync(cwd() + "/.meshrc.yaml", "utf8"));

  template.name = name;
  template.handler.postgraphile.connectionString = connectionString;

  config.sources.push(template);

  writeFileSync(cwd() + "/.meshrc.yaml", dump(config), "utf8");
};

export const installHandler = (handlerName) => {
  const handlers = {
    postgres: "@graphql-mesh/postgraphile@0.21.22",
    graphql: "@graphql-mesh/graphql@0.31.24",
  };

  execSync(`npm install ${handlers[handlerName]}`, {
    stdio: "inherit",
    encoding: "utf-8",
  });
};

export const initProject = () => {
  execSync("npm init -y", { encoding: "utf-8" });
  execSync(
    "npm install @graphql-mesh/cli@0.78.33 @graphql-mesh/runtime@0.44.21 graphql@16.6.0",
    { stdio: "inherit", encoding: "utf-8" }
  );
};

export const meshBuild = () => {
  execSync("npx mesh build", { stdio: "inherit", encoding: "utf-8" });
};

export const meshStart = () => {
  execSync("npx mesh start", { stdio: "inherit", encoding: "utf-8" });
};

export const meshDev = () => {
  execSync("npx mesh dev", { stdio: "inherit", encoding: "utf-8" });
};
