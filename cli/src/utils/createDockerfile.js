import { execSync } from "child_process";

export default () => {
  execSync("touch Dockerfile", { encoding: "utf-8" });
  execSync("touch .dockerignore", { encoding: "utf-8" });
};
