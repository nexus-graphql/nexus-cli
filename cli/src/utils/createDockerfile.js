import { writeFileSync } from "fs";
import createDockerfileContents from './createDockerfileContents.js';

export default port => {
  writeFileSync("Dockerfile", createDockerfileContents(port), "utf8");
  writeFileSync(".dockerignore", "node_modules\n.mesh\ndeployment", "utf8");
};