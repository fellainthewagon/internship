const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { db, uploadsFolder } = require("./config");
const filesRouter = require("./files/filesRouter");
const errorsHandler = require("./middleware/errorsHandler");

const app = express();
const dirname = path.resolve();

mongoose
  .connect(`mongodb://${db.host}:${db.port}/${db.name}`)
  .then(() => console.log("Connected to mongodb"));

app.use(morgan("dev"));
app.use(express.static(`${dirname}/public`));
app.use(`/${uploadsFolder}`, express.static(path.join(dirname, uploadsFolder)));

app.use("/files", filesRouter);

app.use(errorsHandler);

module.exports = app;
