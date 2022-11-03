import { cwd } from "process";
import { readFileSync } from "fs";
import { log, logSuccess } from "./logger.js";
import createDockerfile from "./createDockerfile.js";
import createDockerImage from "./createDockerImage.js";

export default () => {
  const envJSON = JSON.parse(readFileSync(`${cwd()}/env.json`));
  log("Updating your docker image");
  createDockerfile(envJSON.port);
  createDockerImage(envJSON.imageName);
  logSuccess("Your docker image has been updated!");
};
