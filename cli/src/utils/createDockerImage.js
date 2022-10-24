import { execSync } from "child_process";

export default () => {
  execSync("docker build --platform linux/amd64 -t nexus-image .", { encoding: "utf-8" });
};
