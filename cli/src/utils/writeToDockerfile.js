import { writeFileSync } from "fs";
import docker from "../configTemplates/docker/docker.js";

const { string } = docker;

export default () => {
  writeFileSync("Dockerfile", string, "utf8");
  writeFileSync(".dockerignore", "node_modules\n.mesh\ndeployment", "utf8");
};
