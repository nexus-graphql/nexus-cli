import inquirer from "inquirer";
import { log, logSuccess } from "../utils/logger.js";
import destroyECS from "../utils/destroyECS.js";

const destroy = async () => {
  const answer = await inquirer.prompt([
    {
      name: "destroy",
      type: "list",
      message: "Are you sure you want to destroy?",
      choices: ["yes", "no"],
      default: 0,
    },
  ]);

  if (answer.destroy === "yes") {
    destroyECS();
  }
};

export default async () => {
  await destroy();
};
