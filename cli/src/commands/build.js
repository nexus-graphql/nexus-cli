/*
1. "Getting your server ready for deployment!"
2. Run function to create 'Dockerfile'
   - when successful, run: 
3. Run function to populate 'Dockerfile'
4. 
*/

import inquirer from "inquirer";
import { log, logSuccess } from '../utils/logger.js';
import createDockerfile from "../utils/createDockerfile.js";
import writeToDockerfile from "../utils/writeToDockerfile.js";
import createDockerImage from "../utils/createDockerImage.js";

const build = async () => {
  await inquirer.prompt([
    {
      name: "confirm",
      type: "confirm",
      message: "Are you ready to deploy your server?",
    },
  ]);

  log("Getting your server ready for deployment...");
  createDockerfile();
  writeToDockerfile();
  createDockerImage();
  logSuccess("Your server is ready for deployment!");
}

export default async () => {
  await build();
}