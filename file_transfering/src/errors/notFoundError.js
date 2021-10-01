module.exports = class NotFoundError extends Error {
  constructor() {
    super("Files not found");
    this.statusCode = 404;
  }
};
