module.exports = (err, req, res, next) => {
  global.console.log(err);
  const status = err.statusCode || 500;
  return res.status(status).json({ error: err, message: err.message });
};
