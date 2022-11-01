const awsResourcesRouter = require("express").Router();
const awsHelpers = require("../utils/aws.js");

awsResourcesRouter.get("/ip", (_, res) => {
  const arn = awsHelpers.getARN();
  const eni = awsHelpers.getENI(arn);
  const ip = awsHelpers.getIP(eni);

  res.json({ ip });
});

awsResourcesRouter.get("/status", (req, res) => {
  const arn = awsHelpers.getARN();
  const status = awsHelpers.getStatus(arn);
  res.json({ status });
});

module.exports = awsResourcesRouter;
