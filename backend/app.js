const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const awsRouter = require("./controllers/awsResources.js");
const userRouter = require("./controllers/userResources.js");

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(`${__dirname}/build`)));
app.use("/api/aws", awsRouter);
app.use("/api/user", userRouter);

module.exports = app;
