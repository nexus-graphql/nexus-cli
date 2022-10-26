import { cwd } from "process";
import { execSync } from "child_process";
import { existsSync } from "fs";

export default () => {
  execSync("npm init -y", { encoding: "utf-8" });
  execSync(
    "npm install @graphql-mesh/cli@0.78.33 @graphql-mesh/runtime@0.44.21 graphql@16.6.0 @graphql-mesh/transform-resolvers-composition dotenv",
    { stdio: "inherit", encoding: "utf-8" }
  );

  if (!existsSync(`${cwd()}/src`)) {
    execSync("mkdir ./src", { encoding: "utf-8" });
    execSync("mkdir ./src/composers", { encoding: "utf-8" });
  }

  execSync("touch .env", { encoding: "utf-8" });
};
