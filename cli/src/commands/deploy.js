/*
  Starting to deploy to AWS
*/

import inquirer from "inquirer";
import pushToECR from "../utils/pushToERC.js";
import { log } from "../utils/logger.js";
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
    // create ECR
    // initializeTerraform();
    // pushToECR();
    // initializeTerraform();
    deployTerraform();
  } else {
    console.log("We don't have this set up yet :)");
  }
};

export default async () => {
  await deploy();
};
