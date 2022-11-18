import { execSync } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default () => {
  const path = resolve(__dirname, `../../backend`);

  execSync("npm i", { cwd: path });
};
