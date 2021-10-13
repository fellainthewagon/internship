const multer = require("multer");
const fs = require("fs");
const { randomUUID } = require("crypto");
const { uploadsFolder } = require("../config");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (!fs.existsSync(uploadsFolder)) fs.mkdirSync(uploadsFolder);
    } catch (err) {
      global.console.error(err);
    }

    cb(null, `./${uploadsFolder}`);
  },
  filename: (req, file, cb) => {
    const arr = file.originalname.split(".");
    const name = randomUUID();
    cb(null, `${name}.${arr[arr.length - 1]}`);
  },
});

module.exports = multer({ storage });
