import { execSync } from "child_process";
import { cwd } from "process";

export default async () => {
  execSync(`npm run dev ${cwd()}`, {
    cwd: `../nexus-dashboard/backend`,
    stdio: "inherit",
    encoding: "utf-8",
  });
};
