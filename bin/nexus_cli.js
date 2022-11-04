#!/usr/bin/env node

import { program } from "commander";
import init from "../src/commands/init.js";
import dev from "../src/commands/dev.js";
import add from "../src/commands/add.js";
import deploy from "../src/commands/deploy.js";
import destroy from "../src/commands/destroy.js";
import testingBackend from "../src/commands/testingBackend.js";
import startDashboard from "../src/commands/startDashboard.js";
import redeploy from "../src/commands/redeploy.js";

program
  .command("init")
  .alias("i")
  .description("Initialize new project with .meshrc.yaml configuration file")
  .action(init);

program
  .command("dev")
  .alias("d")
  .description("Starts a development graphql mesh server")
  .action(dev);

program
  .command("add")
  .alias("a")
  .description("Adds a new data source to your graphql server")
  .action(add);

program
  .command("deploy")
  .description("Starts deployment process")
  .argument(
    "autoValidate",
    "auto validate when calling from the admin dashboard"
  )
  .action(deploy);

program
  .command("destroy")
  .description("Destroy your ECS Fargate Infrastructure")
  .action(destroy);

program
  .command("backend")
  .description("testing backend")
  .action(testingBackend);

program
  .command("dashboard")
  .description("Start admin dashboard")
  .action(startDashboard);

program
  .command("redeploy")
  .description("Redeploying the new changes")
  .action(redeploy);

program.parse(process.argv);
