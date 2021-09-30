const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { db } = require("./config");
const filesRouter = require("./files/filesRouter");
const errorsHandler = require("./middleware/errorsHandler");

const app = express();
const dirname = path.resolve();

mongoose
  .connect(`mongodb://${db.host}:${db.port}/${db.name}`)
  .then(() => console.log("Connected to mongodb"));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${dirname}/public`));
app.use("/uploads", express.static(`${dirname}/uploads`));

app.use("/files", filesRouter);

app.use(errorsHandler);

module.exports = app;
