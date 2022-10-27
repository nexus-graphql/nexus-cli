#!/usr/bin/env node

import { program } from "commander";
import init from "../src/commands/init.js";
import dev from "../src/commands/dev.js";
import add from "../src/commands/add.js";
import build from "../src/commands/build.js";
import deploy from "../src/commands/deploy.js";
import destroy from "../src/commands/destroy.js";

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
  .command("build")
  .alias("b")
  .description("Generating Docker image to deploy to your private repository")
  .action(build);

program
  .command("deploy")
  .description("Starts deployment process")
  .action(deploy);

program
  .command("destroy")
  .description("Destroy your ECS Fargate Infrastructure")
  .action(destroy);

program.parse(process.argv);