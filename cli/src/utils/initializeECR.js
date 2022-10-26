import { execSync } from "child_process";
import { chdir } from "process";

export default async () => {
  chdir(`../cli/src/configTemplates/deployment/AWS`);

  execSync("terraform init", {
    stdio: "inherit",
    encoding: "utf-8",
  });
  execSync("terraform plan", {
    stdio: "inherit",
    encoding: "utf-8",
  });
  execSync("terraform apply", {
    stdio: "inherit",
    encoding: "utf-8",
  });
};
