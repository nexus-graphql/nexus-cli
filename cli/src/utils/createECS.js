import { chdir, cwd } from "process";
import { execSync } from "child_process";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

export default async () => {
  execSync("terraform init --target=module.ecs", {
    stdio: "inherit",
    encoding: "utf-8",
  });
  execSync("terraform plan --target=module.ecs", {
    stdio: "inherit",
    encoding: "utf-8",
  });
  execSync("terraform apply --target=module.ecs", {
    stdio: "inherit",
    encoding: "utf-8",
  });
};
