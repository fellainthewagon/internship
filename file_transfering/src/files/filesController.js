const NotFoundError = require("../errors/notFoundError");
const FilesService = require("./filesService");

class FilesController {
  constructor() {
    this.service = new FilesService();
  }

  async getAll(req, res, next) {
    try {
      const files = await this.service.getAll();
      if (!files.length) throw new NotFoundError("Files not found");

      return res.json(files);
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res, next) {
    try {
      const file = await this.service.create(req.file);

      return res.json(file);
    } catch (error) {
      return next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const file = await this.service.getOne(req.params.id);
      if (!file) throw new NotFoundError("File not found");

      return res.json(file);
    } catch (error) {
      return next(error);
    }
  }

  async deleteOne(req, res, next) {
    try {
      const file = await this.service.deleteOne(req.params.id);
      if (!file) throw new NotFoundError("File not found");

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  async deleteAll(req, res, next) {
    try {
      await this.service.deleteAll();

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new FilesController();
