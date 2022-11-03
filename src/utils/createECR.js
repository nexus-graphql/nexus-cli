import { execSync } from "child_process";
import { cwd } from "process";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

export default async () => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const directory = resolve(dirname, "../configTemplates/deployment/AWS");

  const envJSON = JSON.parse(readFileSync(`${cwd()}/env.json`));

  execSync("terraform init -target=module.ecr", {
    cwd: directory,
    encoding: "utf-8",
  });
  execSync(
    `terraform apply -target=module.ecr -var=aws_region=${envJSON.awsRegion} -var=port=${envJSON.port} -auto-approve`,
    {
      cwd: directory,
      encoding: "utf-8",
    }
  );
};
