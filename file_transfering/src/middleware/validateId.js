const Joi = require("joi");
const BadRequestError = require("../errors/badRequestError");

module.exports = (req, res, next) => {
  const schema = Joi.string().required();
  try {
    const { error } = schema.validate(req.params.id);
    if (error) throw new BadRequestError();

    return next();
  } catch (error) {
    return next(error);
  }
};
