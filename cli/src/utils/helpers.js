/*

read from configTemplates/postgres.yaml
turn yaml file into js object
assign name to data.name
assign connectionString to data.connectionString
dump js object into yaml format
write to graphql_mesh/.meshrc.yaml

write bash script that will cd into the graphql_mesh directory
run the following commands:
  npx mesh build
  npx mesh dev

*/
import pkg from "js-yaml";
const { load, dump } = pkg;
import { readFileSync, writeFileSync } from "fs";
import { exec, execSync } from "child_process";
import { cwd } from "process";

export const createMeshConfig = (name, connectionString) => {
  const doc = load(
    readFileSync(cwd() + "/../cli_mesh/cli/configTemplates/base.yaml", "utf8")
  );
  doc.sources[0].name = name;
  doc.sources[0].handler.postgraphile.connectionString = connectionString;

  writeFileSync(cwd() + "/.meshrc.yaml", dump(doc), "utf8");
};

export const addGraphqlSourceToConfig = (name, endpoint) => {
  const template = load(
    readFileSync(
      cwd() + "/../cli_mesh/cli/configTemplates/graphql.yaml",
      "utf8"
    )
  );
  const config = load(readFileSync(cwd() + "/.meshrc.yaml", "utf8"));

  template.name = name;
  template.handler.graphql.endpoint = endpoint;

  config.sources.push(template);

  writeFileSync(cwd() + "/.meshrc.yaml", dump(config), "utf8");
};

export const addPostgresSourceToConfig = (name, connectionString) => {
  const template = load(
    readFileSync(
      cwd() + "/../cli_mesh/cli/configTemplates/postgres.yaml",
      "utf8"
    )
  );
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
