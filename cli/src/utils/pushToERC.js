import { exec, execSync } from "child_process";
import { log } from "./logger.js";

export default async () => {
  exec("aws sts get-caller-identity", (_, stdout) => {
    const acctNum = JSON.parse(stdout).Account;
    const url = `${acctNum}.dkr.ecr.us-east-1.amazonaws.com/ecr-automation`;

    log("Logging into your AWS ECR");

    execSync(
      `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${acctNum}.dkr.ecr.us-east-1.amazonaws.com`
    );

    execSync(`docker tag nexus-image:latest ${url}:latest`, {
      stdio: "inherit",
    });

    log("Pushing your docker image to your ECR");
    execSync(`docker push ${url}:latest`, { stdio: "inherit" });
  });
};
