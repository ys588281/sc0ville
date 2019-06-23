const resp = require('./resp.js')
const config = require('../config.js')
const respConst = require('../constants/resp.js')
const verifyToken = (req, res, next) => {
  const token = req.get(config.AUTH_KEY);
  if (token != config.API_KEY) {
    resp.errResponse(respConst.authError, res);
    next(err);
    return
  }
  next()
}

module.exports = {
    verifyToken
};
