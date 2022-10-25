import { execSync } from "child_process";

export default () => {
  execSync("docker build --platform linux/amd64 -t nexus-image .", {
    stdio: "inherit",
    encoding: "utf-8",
  });
};
