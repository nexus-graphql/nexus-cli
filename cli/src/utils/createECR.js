import { execSync } from "child_process";
import pushToERC from "./pushToERC.js";

export default async () => {
  execSync("terraform init -target=module.ecr", {
    stdio: "inherit",
    encoding: "utf-8",
  });
  execSync("terraform plan -target=module.ecr", {
    stdio: "inherit",
    encoding: "utf-8",
  });
  execSync("terraform apply -target=module.ecr", {
    stdio: "inherit",
    encoding: "utf-8",
  });
};
