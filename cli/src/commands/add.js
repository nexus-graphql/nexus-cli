import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";

import { addGraphqlSourceToConfig, installHandler } from "../utils/helpers.js";

const add = async () => {
  let answers = await inquirer.prompt([
    {
      name: "dataSourceType",
      type: "list",
      message: "Why type of data source would you like to add?",
      choices: ["postgres", "graphql"],
      default: 0,
    },
    {
      name: "name",
      type: "input",
      message: "Enter a name for this data source:",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Please enter a name for this data source";
        }
      },
    },
    {
      name: "pgUrl",
      type: "input",
      message: "Enter your postgres connection string:",
      when: (answer) => answer.dataSourceType === "postgres",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Please enter a postgres connection string";
        }
      },
    },
    {
      name: "graphqlEndpoint",
      type: "input",
      message: "Enter your graphql endpoint for this data source:",
      when: (answer) => answer.dataSourceType === "graphql",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Please enter a graphql endpoint";
        }
      },
    },
    {
      name: "confirm-data-source",
      type: "confirm",
      message: "Are you ready to add this data source?",
    },
  ]);
  if (answers.dataSourceType === "graphql") {
    installHandler("graphql");
    addGraphqlSourceToConfig(answers.name, answers.graphqlEndpoint);
  }
  console.log(`Successfully added your ${answers.dataSourceType} data source!`);
  // const init = () => {
  //   let spinner = createSpinner("Initializing your project folder.\n").start();

  //   initProject();
  //   spinner.success({ text: "Project folder has been initialized." });

  //   spinner = createSpinner("Installing mesh handlers.\n").start();

  //   installHandlers();
  //   spinner.success({ text: "Handlers installed." });

  //   spinner = createSpinner("Generating mesh server.\n").start();

  //   createMeshConfig(input.name, input.connectionString);
  //   spinner.success({ text: "Mesh server created" });
  // };

  // init();
};

export default async () => {
  console.log(
    chalk.red(figlet.textSync("New Data Source", { horizontalLayout: "full" }))
  );

  add();
};
