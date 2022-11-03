import { chdir, cwd } from "process";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { readFileSync } from "fs";

export default async () => {
  const envJSON = JSON.parse(readFileSync(`${cwd()}/env.json`));
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const directory = resolve(dirname, "../configTemplates/deployment/AWS");
  chdir(directory);

  execSync(
    `terraform destroy -var=aws_region=${envJSON.awsRegion} -var=port=${envJSON.port} -auto-approve`
  );
};
