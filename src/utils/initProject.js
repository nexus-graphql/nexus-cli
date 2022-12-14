import { cwd } from "process";
import { execSync } from "child_process";
import { existsSync } from "fs";
import installDashboard from "./installDashboard.js";

const packages = [
  "@graphql-mesh/cli@0.78.33",
  "@graphql-mesh/runtime@0.44.21",
  "graphql@16.6.0",
  "@graphql-mesh/transform-resolvers-composition",
  "postgraphile-plugin-connection-filter",
];

export default () => {
  execSync("npm init -y", { encoding: "utf-8" });
  execSync(`npm install ${packages.join(" ")} --loglevel=error`, {
    /* stdio: "inherit", */ encoding: "utf-8",
  });

  if (!existsSync(`${cwd()}/src`)) {
    execSync("mkdir ./src", { encoding: "utf-8" });
    execSync("mkdir ./src/composers", { encoding: "utf-8" });
  }

  installDashboard();
};
