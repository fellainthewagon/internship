const { promises: fs, createReadStream } = require("fs");
const path = require("path");

async function readableStream(folder) {
  try {
    const file = await fs.readdir(folder);
    if (!file.length) throw new Error("Folder is empty");

    const stream = createReadStream(
      path.join(__dirname, folder, file[0]),
      "utf8"
    );

    let i = 0;
    stream.on("data", (chunk) => {
      console.log(`Chunk ${i}: <${chunk.slice(0, 15)}>...`);

      i++;
    });

    stream.on("end", () => {
      console.log("The sheet has been fully read!");
    });
  } catch (error) {
    console.error("Something went wrong...\n", error);
  }
}

readableStream("source");
