#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import {
  createMeshConfig,
  initProject,
  installHandlers,
} from "./utils/helpers.js";

console.log(
  chalk.red(figlet.textSync("Graphql", { horizontalLayout: "full" }))
);

const run = async () => {
  let input = await inquirer.prompt([
    {
      name: "connectionString",
      type: "input",
      message: "Enter your postgres connection string:",
      validate: function (value) {
        // todo: validate postgres connection string (make connection to DB to make sure connection is valid)
        if (value.length) {
          return true;
        } else {
          return "Please enter a postgres connection string";
        }
      },
    },
    {
      name: "name",
      type: "input",
      message: "Enter the name of the data source",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Enter a name for the data source";
        }
      },
    },
    {
      name: "confirm-postgres-connection",
      type: "confirm",
      message: "Confirm postgres connection information?",
    },
  ]);

  const init = () => {
    let spinner = createSpinner("Initializing your project folder.\n").start();

    initProject();
    spinner.success({ text: "Project folder has been initialized." });

    spinner = createSpinner("Installing mesh handlers.\n").start();

    installHandlers();
    spinner.success({ text: "Handlers installed." });

    spinner = createSpinner("Generating mesh server.\n").start();

    createMeshConfig(input.name, input.connectionString);
    spinner.success({ text: "Mesh server created" });
  };

  init();
};

run();

/*
workflow
run the cli program
  get user database string
  get users data source name

  take connection string and data source name
  create a package.json by running npm init -y
  install the following packages;
    "@graphql-mesh/cli": "^0.78.33",
    "@graphql-mesh/runtime": "^0.44.21"
    "graphql": "^16.6.0"
  
  install data source handlers
    ex. postgraphile, grapqhl, openapi
  
  generate .meshrc.yaml file inside the current working directory
    - require process lib
      - cwd()
*/
