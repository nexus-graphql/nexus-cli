import { exec } from "child_process";
import open from "open";
import { cwd } from "process";

export default async () => {
  const server = exec(`concurrently "npx mesh dev" "nexus-dashboard ${cwd()}"`);
  (async () => open("http://localhost:3001"))();
  server.stdout.on("data", (data) => {
    console.log(`${data}`);
  });
};
