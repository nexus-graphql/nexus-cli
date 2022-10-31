import { execSync } from "child_process";
import { chdir, cwd } from "process";
import { readFileSync } from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

export default async () => {
  const envJSON = JSON.parse(readFileSync(`${cwd()}/env.json`));

  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const directory = resolve(dirname, "../configTemplates/deployment/AWS");
  chdir(directory);

  execSync("terraform init --target=module.ecs", {
    stdio: "inherit",
    encoding: "utf-8",
  });
  execSync(
    `terraform apply --target=module.ecs -var=aws_region=${envJSON.awsRegion} -var=port=${envJSON.port} -auto-approve`,
    {
      stdio: "inherit",
      encoding: "utf-8",
    }
  );
};
