const userResourcesRouter = require("express").Router();
const userHelpers = require("../utils/user.js");

userResourcesRouter.get("/authorization", (req, res) => {
  res.json({ authorization: userHelpers.getAuthorization() });
});

userResourcesRouter.get("/dataSources", (req, res) => {
  res.json(userHelpers.getDataSources());
});

module.exports = userResourcesRouter;
