import inquirer from "inquirer";
import destroyECS from "../utils/destroyECS.js";
import { log, logSuccess } from "../utils/logger.js";

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
    log("We are destroying your infrastructure");
    destroyECS();
    logSuccess(
      "Your infrastructure has been destroyed, this can take up to a few minutes."
    );
  }
};

export default async () => {
  await destroy();
};
