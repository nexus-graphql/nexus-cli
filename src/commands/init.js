import inquirer from "inquirer";
import { asciiArt, logSuccess, log } from "../utils/logger.js";
import installHandler from "../utils/installHandler.js";
import initProject from "../utils/initProject.js";
import createMeshConfig from "../utils/createMeshConfig.js";
import validateConnectionString from "../utils/validateConnectionString.js";
import createComposer from "../utils/createComposer.js";
import generateAdminSecret from "../utils/generateAdminSecret.js";

const init = async () => {
  const input = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Enter the name of the data source",
      validate(value) {
        if (value.length) {
          return true;
        }

        return "Enter a name for the data source";
      },
    },
    {
      name: "connectionString",
      type: "input",
      message: "Enter your postgres connection string:",
      validate(value) {
        return new Promise((res, rej) => {
          validateConnectionString(value)
            .then((result) => {
              res(result);
            })
            .catch((e) => {
              rej(e.message);
            });
        });
      },
    },
    {
      name: "confirm-postgres-connection",
      type: "confirm",
      message: "Confirm postgres connection information?",
    },
  ]);

  log("Initializing your project folder...");

  initProject();
  logSuccess("Project folder has been initialized.");

  log("Setting up authentication...");
  createComposer("isAuth");
  const adminSecret = generateAdminSecret();

  log("Installing mesh handlers...\n");
  installHandler("postgres");
  installHandler("graphql");
  installHandler("openapi");

  log("Generating mesh server...\n");
  createMeshConfig(input.name, input.connectionString);

  logSuccess(
    'Your server is ready to run. Use "$ nexus dev" to run in dev mode'
  );
  log("Make sure to include an Authorization header with your admin secret:");
  log(`{ "Authorization": "${adminSecret}" }`);
};

export default async () => {
  asciiArt("GraphQL");
  await init();
};
