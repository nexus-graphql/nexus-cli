import { execSync } from "child_process";
import { chdir, cwd } from "process";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

export default async () => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const directory = resolve(dirname, "../configTemplates/deployment/AWS");
  chdir(directory);

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
