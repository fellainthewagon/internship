const { Schema, model } = require("mongoose");

const schema = new Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  path: { type: String, required: true },
});

module.exports = model("File", schema);
