const awsRouter = require("express").Router();
const { getIP, getStatus } = require("../utils/aws");

awsRouter.get("/ip", (_, res) => {
  res.status(200).json(getIP());
});

awsRouter.get("/status", (_, res) => {
  res.status(200).json(getStatus());
});

module.exports = awsRouter;
