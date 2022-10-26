import { chdir } from "process";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import createECRRepo from "./createECRRepo.js";

export default async () => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const directory = resolve(dirname, "../configTemplates/deployment/AWS");
  chdir(directory);

  createECRRepo();
};
