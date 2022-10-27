import { exec, execSync } from "child_process";

export default async () => {
  exec("aws sts get-caller-identity", (error, stdout) => {
    const acctNum = JSON.parse(stdout).Account;
    const url = `${acctNum}.dkr.ecr.us-east-1.amazonaws.com/ecr_example_repo`;

    execSync(
      `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${acctNum}.dkr.ecr.us-east-1.amazonaws.com`
    );
    execSync(`docker tag nexus-image:latest ${url}:latest`, {
      stdio: "inherit",
    });
    execSync(`docker push ${url}:latest`, { stdio: "inherit" });
  });
};
