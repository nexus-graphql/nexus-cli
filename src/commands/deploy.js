/*
  Starting to deploy to AWS
*/

import inquirer from "inquirer";
import { log, logSuccess } from "../utils/logger.js";
import deployTerraform from "../utils/deployTerraform.js";

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
    deployTerraform();
  } else {
    console.log("We don't have this set up yet :)");
  }
};

export default async () => {
  await deploy();
};
