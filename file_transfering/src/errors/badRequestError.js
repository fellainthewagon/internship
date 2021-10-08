module.exports = class BadRequestError extends Error {
  constructor() {
    super("ID is not valid");
    this.statusCode = 400;
  }
};
