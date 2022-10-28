/*
  Starting to deploy to AWS
*/

import inquirer from "inquirer";
import { log } from "../utils/logger.js";
import createECS from "../utils/createECS.js";

const deploy = async () => {
  const answer = await inquirer.prompt([
    {
      name: "deploymentType",
      type: "list",
      message: "Would you like to deploy on AWS or Google Cloud?",
      choices: ["AWS", "Google Cloud"],
      default: 0,
    },
  ]);

  if (answer.deploymentType === "AWS") {
    log("Getting your server ready to deploy");
    createECS();
  } else {
    console.log("We don't have this set up yet :)");
  }
};

export default async () => {
  await deploy();
};
