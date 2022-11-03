import { exec } from "child_process";
import open from "open";
import { cwd } from "process";

export default async () => {
  const server = exec(`nexus-dashboard ${cwd()}`);
  setTimeout(() => {
    open("http://localhost:3001");
  }, 1000);
  server.stdout.on("data", (data) => {
    console.log(`${data}`);
  });
};
