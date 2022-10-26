import { execSync } from "child_process";

const build = () => {
  execSync("npx mesh build", { stdio: "inherit", encoding: "utf-8" });
};

const start = () => {
  execSync("npx mesh start", { stdio: "inherit", encoding: "utf-8" });
};

const dev = (port) => {
  execSync(`npx mesh dev --port ${port}`, {
    stdio: "inherit",
    encoding: "utf-8",
  });
};

export default {
  build,
  start,
  dev,
};
