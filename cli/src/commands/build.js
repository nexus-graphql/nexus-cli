import inquirer from "inquirer";
import { log, logSuccess } from "../utils/logger.js";
import createDockerfile from "../utils/createDockerfile.js";
import createDockerImage from "../utils/createDockerImage.js";
import createECR from "../utils/createECR.js";
import pushToERC from "../utils/pushToERC.js";

const build = async () => {
  // const input = await inquirer.prompt([
  //   {
  //     name: "port",
  //     default: 4000,
  //     type: "input",
  //     message:
  //       "Which port would you like to expose for your server in production? Press 'Enter' for default:",
  //   },
  //   {
  //     name: "imageName",
  //     type: "input",
  //     message:
  //       "What would you like to name your docker image? Example: nexus-image",
  //   },
  // ]);

  // log("Getting your server ready for deployment...");
  // createDockerfile(input.port);
  // createDockerImage(input.imageName);
  // logSuccess("Your server is ready for deployment!");
  createECR();
  pushToERC();
};

export default async () => {
  await build();
};
