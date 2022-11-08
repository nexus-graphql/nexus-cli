import inquirer from "inquirer";
import { log, logSuccess } from "../utils/logger.js";
import createECS from "../utils/createECS.js";
import build from "./build.js";
import getURL from "../utils/getURL.js";
import writeToEnvFile from "../utils/writeToEnvFile.js";

const deploy = async (prefilledAnswersDeploy, prefilledAnswersBuild) => {
  const answer = await inquirer.prompt(
    [
      {
        name: "deploymentRes",
        type: "list",
        message: "Are you sure you want to deploy?",
        choices: ["Yes", "No"],
        default: 0,
      },
    ],
    prefilledAnswersDeploy
  );

  if (answer.deploymentRes === "Yes") {
    log("Getting your server ready for deployment");
    await build(prefilledAnswersBuild);
    log("Provisioning your AWS ECS/Fargate resources");
    await createECS();

    const tryURL = setInterval(() => {
      const url = getURL();
      if (url) {
        clearInterval(tryURL);
        writeToEnvFile({ localChanges: false });
        logSuccess(
          `Your server has been successfully deployed! Your URL is ${url} `
        );
      }
    }, 5000);
  }
};

export default async (autoValidate) => {
  let prefilledAnswersDeploy = {};
  let prefilledAnswersBuild = {};
  if (autoValidate === "autoValidate") {
    prefilledAnswersDeploy = { deploymentRes: "Yes" };
    prefilledAnswersBuild = {
      port: 4000,
      imageName: "nexus-image",
      awsRegion: "us-east-1",
    };
  }
  await deploy(prefilledAnswersDeploy, prefilledAnswersBuild);
};
