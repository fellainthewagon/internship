const File = require("../models/File");
const { promises: fs } = require("fs");
const NotFoundError = require("../errors/notFoundError");
const path = require("path");
const { uploadsFolder } = require("../config");

module.exports = class FilesService {
  async getAll() {
    const files = await File.find({});
    if (!files.length) throw new NotFoundError();

    return files;
  }

  async create(file) {
    const { filename, originalname, path, mimetype } = file;

    return File.create({
      filename,
      originalname,
      mimetype,
      path,
    });
  }

  async deleteOne(id) {
    const file = await File.findByIdAndDelete({ _id: id });
    if (!file) throw new NotFoundError();

    await fs.unlink(file.path);
  }

  async deleteAll() {
    const file = await File.deleteMany({});
    if (!file.deletedCount) throw new NotFoundError();

    const files = await fs.readdir(uploadsFolder);
    await Promise.all(
      files.map((file) => fs.unlink(path.join(uploadsFolder, file)))
    );
  }
};
