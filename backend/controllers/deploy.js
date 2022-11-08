const deployRouter = require("express").Router();
const { deploy, redeploy, destroy } = require("../utils/deploy");

deployRouter.post("/deploy", (_, res) => {
  deploy();
  res.status(204).send();
});

deployRouter.post("/redeploy", (_, res) => {
  redeploy();
  res.status(204).send();
});

deployRouter.delete("/destroy", (_, res) => {
  destroy();
  res.status(204).send();
});

module.exports = deployRouter;
