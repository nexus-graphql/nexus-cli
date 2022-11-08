const { exec } = require("child_process");
const userDirectory = process.argv[2];

const deploy = () => {
  let child = exec("nexus deploy autoValidate", { cwd: userDirectory });
  child.stdout.on("data", (data) => {
    console.log(data);
  });
};

const redeploy = () => {
  let child = exec("nexus redeploy autoValidate", { cwd: userDirectory });
  child.stdout.on("data", (data) => {
    console.log(data);
  });
};

const destroy = () => {
  exec("nexus destroy autoValidate", { cwd: userDirectory });
};

module.exports = {
  deploy,
  redeploy,
  destroy,
};
