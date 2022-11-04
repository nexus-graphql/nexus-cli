import inquirer from "inquirer";
import createNewImage from "../utils/updateDockerImage.js";
import pushToERC from "../utils/pushToERC.js";
import { log, logSuccess } from "../utils/logger.js";
import createNewTask from "../utils/createNewTask.js";
import writeToEnvFile from "../utils/writeToEnvFile.js";

const redeploy = async (prefilledAnswers) => {
  const answer = await inquirer.prompt(
    [
      {
        name: "changeRes",
        type: "list",
        message: "Have all of your changes been made?",
        choices: ["Yes", "No"],
        default: 0,
      },
      {
        name: "redeploymentRes",
        type: "list",
        message: "Are you ready to redeploy?",
        when: (input) => input.changeRes === "Yes",
        choices: ["Yes", "No"],
      },
    ],
    prefilledAnswers
  );

  if (answer.changeRes === "No") {
    console.log("Please make all changes prior to redeploying");
  } else if (answer.redeploymentRes === "Yes") {
    createNewImage();
    log("Pushing updated docker image to your ECR repo");
    pushToERC();
    logSuccess("Your docker image has been pushed!");
    createNewTask();
    writeToEnvFile({ localChanges: false });
  }
};

export default async (autoValidate) => {
  let prefilledAnswers = {};
  if (autoValidate) {
    prefilledAnswers = { changeRes: "Yes", redploymentRes: "Yes" };
  }
  await redeploy(prefilledAnswers);
};
