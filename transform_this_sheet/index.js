const path = require("path");
const {
  promises: fs,
  existsSync,
  createReadStream,
  createWriteStream,
} = require("fs");
const { Transform } = require("stream");

const removePp = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().replace(/[рР]/g, ""));

    callback();
  },
});

const inputFolder = "input";
const outputFolder = "output";

async function duplexTransform() {
  try {
    const files = await fs.readdir(inputFolder);
    if (!files.length) throw new Error("Folder is empty");

    const pathOutput = path.join(__dirname, outputFolder);
    if (!existsSync(pathOutput)) await fs.mkdir(pathOutput);

    files.forEach(async (file) => {
      const input = path.join(__dirname, inputFolder, file);
      const output = path.join(__dirname, outputFolder, file);

      const readStream = createReadStream(input, "utf-8");
      const writeStream = createWriteStream(output);

      readStream.pipe(removePp).pipe(writeStream);
    });
  } catch (error) {
    console.error("Something went wrong...\n", error);
  }
}

duplexTransform();
