const multer = require("multer");
const { randomUUID } = require("crypto");
const { uploadsFolder } = require("../config");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./${uploadsFolder}`);
  },
  filename: (req, file, cb) => {
    const arr = file.originalname.split(".");
    const name = randomUUID();
    cb(null, `${name}.${arr[arr.length - 1]}`);
  },
});

module.exports = multer({ storage });
