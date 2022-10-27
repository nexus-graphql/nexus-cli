import { chdir } from "process";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

export default async () => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const directory = resolve(dirname, "../configTemplates/deployment/AWS");
  chdir(directory);

  execSync('terraform destroy', { stdio: "inherit" })
};
