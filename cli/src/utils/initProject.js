import { execSync } from "child_process";

export default () => {
  execSync("npm init -y", { encoding: "utf-8" });
  execSync(
    "npm install @graphql-mesh/cli@0.78.33 @graphql-mesh/runtime@0.44.21 graphql@16.6.0",
    { stdio: "inherit", encoding: "utf-8" }
  );
};
