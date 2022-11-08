import { execSync } from "child_process";

export default () => {
  setTimeout(() => {
    execSync("nexus dashboard", {
      encoding: "utf-8",
    });
  }, 2000);
};
