import { cwd } from "process";
import { resolve, dirname } from "path";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (composer) => {
  const filePath = resolve(
    __dirname,
    `../configTemplates/composers/${composer}.js`
  );

  const data = readFileSync(filePath);
  writeFileSync(`${cwd()}/src/composers/${composer}.js`, data, "utf8");
};
