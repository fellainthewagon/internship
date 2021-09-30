const File = require("../models/File");

module.exports = class FilesService {
  async getAll() {
    try {
      return File.find({});
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(file) {
    try {
      const { filename, originalname, path, mimetype } = file;

      return File.create({
        filename,
        originalname,
        mimetype,
        path,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOne(id) {
    try {
      return File.findOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOne(id) {
    try {
      return File.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      await File.deleteMany({});
    } catch (error) {
      throw new Error(error);
    }
  }
};
