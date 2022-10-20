import inquirer from "inquirer";
import { asciiArt, logSuccess } from "../utils/logger.js";
import installHandler from "../utils/installHandler.js";
import {
  addGraphqlSourceToConfig,
  addPostgresSourceToConfig,
} from "../utils/dataSources.js";

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
      name: "postgresConnectionString",
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
  } else if (answers.dataSourceType === "postgres") {
    addPostgresSourceToConfig(answers.name, answers.postgresConnectionString);
  }

  logSuccess(`Successfully added your ${answers.dataSourceType} data source!`);
};

export default async () => {
  asciiArt("New Data Source");

  await add();
};
