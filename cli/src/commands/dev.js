import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { meshDev } from "../utils/helpers.js";

console.log(
  chalk.red(
    figlet.textSync("Let's Run This Mesh", { horizontalLayout: "full" })
  )
);

export default async () => {
  await inquirer.prompt([
    {
      name: "confirmRunDev",
      type: "confirm",
      message: "Are you ready to start your GraphQL server?",
    },
  ]);

  const startServer = () => {
    let spinner = createSpinner("Start your server.\n").start();

    meshDev();
    spinner.success({ text: "Server started on Port 4000." });
  };

  startServer();
};
