import { v4 as uuidv4 } from "uuid";
import { cwd } from "process";
import { writeFileSync } from "fs";

export default () => {
  const adminSecret = uuidv4();
  const data = `ADMIN_SECRET=${adminSecret}`;
  writeFileSync(`${cwd()}/.env`, data, "utf8");
  return adminSecret;
};
