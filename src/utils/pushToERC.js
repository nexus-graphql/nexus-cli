import { execSync } from "child_process";
import { readFileSync } from "fs";
import { cwd } from "process";

export default async () => {
  const getAcctData = () => {
    const data = execSync("aws sts get-caller-identity");
    return data;
  };

  const acctNum = JSON.parse(getAcctData()).Account;
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
