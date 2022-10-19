import inquirer from "inquirer";
import { asciiArt } from "../utils/logger.js";
import { createSpinner } from "nanospinner";
import installHandler from "../utils/installHandler.js";
import initProject from "../utils/initProject.js";
import createMeshConfig from "../utils/createMeshConfig.js";

const init = async () => {
  let input = await inquirer.prompt([
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
      name: "connectionString",
      type: "input",
      message: "Enter your postgres connection string:",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Please enter a postgres connection string";
        }
      },
    },
    {
      name: "confirm-postgres-connection",
      type: "confirm",
      message: "Confirm postgres connection information?",
    },
  ]);

  let spinner = createSpinner("Initializing your project folder.\n").start();

  initProject();
  spinner.success({ text: "Project folder has been initialized." });

  spinner = createSpinner("Installing mesh handlers.\n").start();

  installHandler("postgres");
  spinner.success({ text: "Handlers installed." });

  spinner = createSpinner("Generating mesh server.\n").start();

  createMeshConfig(input.name, input.connectionString);
  spinner.success({
    text: 'Your server is ready to run. Use "$ team4 dev" to run in dev mode',
  });
};

export default async () => {
  asciiArt("graphQL");
  await init();
};
