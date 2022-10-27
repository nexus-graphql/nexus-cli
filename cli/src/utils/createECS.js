import { chdir, cwd } from "process";
import { execSync } from "child_process";

export default async () => {
  console.log(cwd());
  chdir(`${cwd()}/ecs`);

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
