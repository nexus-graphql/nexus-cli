/*
  Starting to deploy to AWS
*/

import inquirer from "inquirer";
import { log, logSuccess } from "../utils/logger.js";
import createECS from "../utils/createECS.js";
import build from "./build.js";
import getURL from "../utils/getURL.js";

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
    await createECS();

    const tryURL = setInterval(() => {
      if (getURL()) {
        const url = getURL();
        clearInterval(tryURL);
        logSuccess(
          `Your server has been successfully deployed! Your URL is ${url} `
        );
        // reminder to add this when merged
        // log("Starting the dashboard!");
        // exec("npx dashboard");
      }
    }, 5000);
  }
};

export default async () => {
  await deploy();
};
