const { createGzip } = require("zlib");
const path = require("path");
const {
  promises: fs,
  existsSync,
  createReadStream,
  createWriteStream,
} = require("fs");

const inputFolder = "input";
const outputFolder = "output";
const gzip = createGzip();

async function compressor() {
  try {
    const files = await fs.readdir(inputFolder);
    if (!files.length) throw new Error("Folder is empty");

    if (!existsSync(path.join(__dirname, outputFolder)))
      await fs.mkdir(path.join(__dirname, outputFolder));

    files.forEach(async (file) => {
      const input = path.join(__dirname, inputFolder, file);
      const output = path.join(__dirname, outputFolder, file + ".gz");

      const readStream = createReadStream(input);
      const writeStream = createWriteStream(output);

      readStream.pipe(gzip).pipe(writeStream);
    });
  } catch (error) {
    console.error("Something went wrong...\n", error);
  }
}

compressor();
