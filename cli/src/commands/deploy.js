/*
  Starting to deploy to AWS
*/

import inquirer from "inquirer";

const deploy = async () => {
  const answer = await inquirer.prompt([
    {
      name: "deploymentType",
      type: "list",
      message: "Would you like to deploy on AWS or Google Cloud?",
      choices: ["AWS", "Google Cloud"],
      default: 0,
    },
  ]);

  if (answer.deploymentType === "AWS") {
    console.log("here");
  }
};

export default async () => {
  await deploy();
};
