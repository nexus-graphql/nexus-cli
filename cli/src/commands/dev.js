import inquirer from "inquirer";
import { log, asciiArt } from "../utils/logger.js";
import mesh from "../utils/mesh.js";

const dev = async () => {
  const input = await inquirer.prompt([
    {
      name: "confirmRunDev",
      type: "confirm",
      message: "Are you ready to start your GraphQL server?",
    },
    {
      name: "port",
      default: 4000,
      type: "input",
      message:
        "Which port would you like to run your server on? Press 'Enter' for default:\n",
    },
  ]);

  log(`Starting your server on port ${input.port}...\n`);
  mesh.dev(input.port);
};

export default async () => {
  asciiArt("Let's Run This Mesh");
  await dev();
};
