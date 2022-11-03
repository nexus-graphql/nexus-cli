/*
  Starting to deploy to AWS
*/

import inquirer from "inquirer";
import { log, logSuccess } from "../utils/logger.js";
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
    log("Getting your server ready for deployment");
    await build();
    log("Provisioning your AWS ECS/Fargate resources");
    createECS();
    logSuccess("Your server has been successfully deployed!");
  }
};

export default async () => {
  await deploy();
};
