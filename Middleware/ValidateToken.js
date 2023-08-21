const { request, response } = require("express");
const jwt = require("jsonwebtoken");
module.exports = function ValidateToken(req = request, res = response, next) {
  const Token = req.headers.authorization;
  if (!Token) return res.status(401).send();
  try {
    const valid = jwt.verify(Token, process.env.TOKEN_KEY);
    if (valid) return next();
    else return res.status(401).send();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      if (err.name == "TokenExpiredError") return res.status(401).json(err);
      else {
        res.status(400).json(err);
      }
    }
  }
};
