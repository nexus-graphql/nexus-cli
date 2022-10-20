#!/usr/bin/env node

import { program } from "commander";
import init from "../src/commands/init.js";
import dev from "../src/commands/dev.js";
import add from "../src/commands/add.js";

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

program.parse(process.argv);
