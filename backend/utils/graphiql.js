const { watch } = require("fs");
const { exec } = require("child_process");
const userDirectory = process.argv[2];

const graphiqlStart = () => {
  const watcher = watch(`${userDirectory}/.meshrc.yaml`);
  let currentChild = exec("npx mesh dev", { cwd: userDirectory });
  watcher.on("change", () => {
    if (currentChild) {
      currentChild.kill();
    }
    currentChild = exec("npx mesh dev", { cwd: userDirectory });
  });
};

module.exports = {
  graphiqlStart,
};
