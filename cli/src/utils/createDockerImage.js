import { execSync } from "child_process";

export default (imageName) => {
  execSync(`docker build --platform linux/amd64 -t ${imageName} .`, {
    stdio: "inherit",
    encoding: "utf-8",
  });
};
