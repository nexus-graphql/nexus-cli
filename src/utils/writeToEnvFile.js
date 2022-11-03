import { cwd } from "process";
import { writeFileSync, readFileSync } from "fs";

export default (data) => {
  console.log(cwd());
  const path = `${cwd()}/env.json`;
  let envJSON = JSON.parse(readFileSync(path));
  envJSON = { ...envJSON, ...data };
  writeFileSync(path, JSON.stringify(envJSON), "utf8");
};
