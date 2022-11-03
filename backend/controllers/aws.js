const awsRouter = require("express").Router();
const { getIP, getStatus } = require("../utils/aws");

awsRouter.get("/ip", (_, res) => {
  res.json(getIP());
});

awsRouter.get("/status", (_, res) => {
  res.json(getStatus());
});

module.exports = awsRouter;
