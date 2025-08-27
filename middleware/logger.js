function logger(req, res, next) {
  const message = `REQUEST: ${req.method} | ${req.url}`;
  console.log(message);
  next();
}

module.exports = { logger };
