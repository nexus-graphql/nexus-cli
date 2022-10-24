import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { asciiArt } from "../utils/logger.js";
import mesh from "../utils/mesh.js";

const dev = async () => {
  await inquirer.prompt([
    {
      name: "confirmRunDev",
      type: "confirm",
      message: "Are you ready to start your GraphQL server?",
    },
  ]);

  const spinner = createSpinner("Starting your server...\n").start();

  mesh.dev();
  spinner.success({ text: "Server started on Port 4000." });
};

export default async () => {
  asciiArt("Let's Run This Mesh");
  await dev();
};
