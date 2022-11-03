/*
  Starting to deploy to AWS
*/

import inquirer from "inquirer";
import { log } from "../utils/logger.js";
import createECS from "../utils/createECS.js";
import build from "./build.js";

const deploy = async () => {
  const answer = await inquirer.prompt([
    {
      name: "deploymentRes",
      type: "list",
      message: "Are you sure you want to deploy?",
      choices: ["Yes", "No"],
      default: 0,
    },
  ]);

  if (answer.deploymentRes === "Yes") {
    log("Getting ready to deploy your server");
    await build();
    createECS();
  }
};

export default async () => {
  await deploy();
};
