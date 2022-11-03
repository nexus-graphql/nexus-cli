import { execSync } from "child_process";
import { readFileSync } from "fs";
import { cwd } from "process";

export default async () => {
  const acctData = JSON.parse(execSync("aws sts get-caller-identity"));
  const acctNum = acctData.Account;
  const envJSON = JSON.parse(readFileSync(`${cwd()}/env.json`));
  const url = `${acctNum}.dkr.ecr.${envJSON.awsRegion}.amazonaws.com/ecr_example_repo`;

  execSync(
    `aws ecr get-login-password --region ${envJSON.awsRegion} | docker login --username AWS --password-stdin ${acctNum}.dkr.ecr.${envJSON.awsRegion}.amazonaws.com`
  );
  execSync(`docker tag ${envJSON.imageName}:latest ${url}:latest`, {
    stdio: "inherit",
  });
  execSync(`docker push ${url}:latest`, { stdio: "inherit" });
};
