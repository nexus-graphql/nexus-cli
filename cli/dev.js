#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { meshDev } from "./utils/helpers.js";

console.log(
  chalk.red(
    figlet.textSync("Let's Run This Mesh", { horizontalLayout: "full" })
  )
);

const run = async () => {
  let input = await inquirer.prompt([
    {
      name: "confirmRunDev",
      type: "confirm",
      message: "Are you ready to start your GraphQL server?",
    },
  ]);

  const init = () => {
    let spinner = createSpinner("Start your server.\n").start();

    meshDev();
    spinner.success({ text: "Server started on Port 4000." });
  };

  init();
};

run();
