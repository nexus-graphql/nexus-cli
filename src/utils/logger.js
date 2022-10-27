import chalk from "chalk";
import figlet from "figlet";

export const asciiArt = (text) => {
  console.log(chalk.red(figlet.textSync(text, { horizontalLayout: "full" })));
};

export const log = (...args) => {
  console.log(...args);
};

export const logSuccess = (text) => {
  console.log(`\u2705 ${chalk.green.bold(text)}`);
};
