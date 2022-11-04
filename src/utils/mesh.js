import { exec, execSync } from "child_process";
import open from "open";

const build = () => {
  execSync("npx mesh build", { stdio: "inherit", encoding: "utf-8" });
};

const start = () => {
  execSync("npx mesh start", { stdio: "inherit", encoding: "utf-8" });
};

const dev = async (port) => {
  const child = exec(`npx mesh dev --port ${port}`, {
    encoding: "utf-8",
  });

  setTimeout(() => {
    open(`http://localhost:${port}`);
  }, 1000);

  child.stdout.on("data", (data) => {
    console.log(data);
  });
};

export default {
  build,
  start,
  dev,
};
