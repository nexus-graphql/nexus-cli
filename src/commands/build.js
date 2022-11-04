import inquirer from "inquirer";
import { log, logSuccess } from "../utils/logger.js";
import createDockerfile from "../utils/createDockerfile.js";
import createDockerImage from "../utils/createDockerImage.js";
import createECR from "../utils/createECR.js";
import pushToERC from "../utils/pushToERC.js";
import writeToEnvFile from "../utils/writeToEnvFile.js";

const build = async (prefilledAnswers) => {
  const inputs = await inquirer.prompt(
    [
      {
        name: "port",
        default: 4000,
        type: "input",
        message:
          "Which port would you like to expose for your server in production? Press 'Enter' for default:",
      },
      {
        name: "imageName",
        type: "input",
        default: "nexus-image",
        message: "What would you like to name your docker image?",
      },
      {
        name: "awsRegion",
        type: "list",
        message: "What region would you like to deploy to?",
        choices: ["us-east-1", "us-west-1"],
        default: 0,
      },
    ],
    prefilledAnswers
  );

  writeToEnvFile(inputs);
  log("Creating your docker image");
  createDockerfile(inputs.port);
  createDockerImage(inputs.imageName);
  logSuccess("Docker image created!");
  log("Creating an AWS ECR repo");
  createECR();
  logSuccess("AWS ECR repo created!");
  log("Pushing your docker image to your AWS ECR repo");
  pushToERC();
  logSuccess("Your docker image has been pushed!");
};

export default async (prefilledAnswers) => {
  await build(prefilledAnswers);
};
