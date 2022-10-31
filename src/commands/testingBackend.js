import { exec, execSync } from "child_process";
import { chdir, cwd } from "process";
import { spawn } from "node:child_process";

export default async () => {
  const server = exec("npm run dev", {
    cwd: `../nexus-dashboard/backend`,
    stdio: "inherit",
    encoding: "utf-8",
  });

  server.stdout.on("data", (data) => {
    console.log(`${data}`);
  });
};
