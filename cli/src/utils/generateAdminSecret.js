import { v4 as uuidv4 } from "uuid";
import { cwd } from "process";
import { writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default () => {
  const filePath = resolve(
    __dirname,
    `../configTemplates/environment/env.json`
  );

  const adminSecret = uuidv4();
  const envJSON = JSON.parse(readFileSync(filePath));
  envJSON.ADMIN_SECRET = adminSecret;
  writeFileSync(`${cwd()}/env.json`, JSON.stringify(envJSON), "utf8");
  return adminSecret;
};
