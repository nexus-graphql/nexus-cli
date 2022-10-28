import { execSync } from "child_process";

export default async () => {
  execSync("terraform init --target=module.ecs", {
    stdio: "inherit",
    encoding: "utf-8",
  });
  execSync("terraform apply --target=module.ecs", {
    stdio: "inherit",
    encoding: "utf-8",
  });
};
