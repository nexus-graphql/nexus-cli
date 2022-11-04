import inquirer from "inquirer";
import destroyECS from "../utils/destroyECS.js";
import { log, logSuccess } from "../utils/logger.js";
import writeToEnvFile from "../utils/writeToEnvFile.js";

const destroy = async (prefilledAnswers) => {
  const answer = await inquirer.prompt(
    [
      {
        name: "destroy",
        type: "list",
        message: "Are you sure you want to destroy?",
        choices: ["yes", "no"],
        default: 0,
      },
    ],
    prefilledAnswers
  );

  if (answer.destroy === "yes") {
    log("We are destroying your infrastructure");
    destroyECS();
    writeToEnvFile({ localChanges: false });
    logSuccess(
      "Your infrastructure has been destroyed, this can take up to a few minutes to finalize."
    );
  }
};

export default async (autoValidate) => {
  let prefilledAnswers = {};
  if (autoValidate === "autoValidate") {
    prefilledAnswers = {
      destroy: "yes",
    };
  }
  await destroy(prefilledAnswers);
};
