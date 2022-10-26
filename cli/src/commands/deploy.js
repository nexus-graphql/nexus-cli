/*
  Starting to deploy to AWS
*/

import inquirer from "inquirer";
import initializeECR from "../utils/initializeECR.js";
import pushToECR from "../utils/pushToERC.js";
import createDockerfile from "../utils/createDockerfile.js";
import createDockerImage from "../utils/createDockerImage.js";
import { log, logSuccess } from "../utils/logger.js";

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
    // createDockerfile(4000);
    // createDockerImage("nexus-image");
    initializeECR();
    // pushToECR();
  } else {
    console.log("We don't have this set up yet :)");
  }
};

export default async () => {
  await deploy();
};
