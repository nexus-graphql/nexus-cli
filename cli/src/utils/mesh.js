import { exec, execSync } from "child_process";

const build = () => {
  execSync("npx mesh build", { stdio: "inherit", encoding: "utf-8" });
};

const start = () => {
  execSync("npx mesh start", { stdio: "inherit", encoding: "utf-8" });
};

const dev = () => {
  exec("npx mesh dev", {
    stdio: "inherit",
    encoding: "utf-8",
    killSignal: "SIGINT",
  });
};

export default {
  build,
  start,
  dev,
};
