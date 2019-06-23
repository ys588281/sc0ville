const responseUtils = require("../../utils/resp.js");
const respConst = require('../../constants/resp')

const createArticleValid = (req, res, next) => {
  if (!req.body) {
    responseUtils.errResponse(respConst.noBodyError, res);
    next(err);
    return;
  } else if (!req.body.title) {
    responseUtils.errResponse(respConst.badRequestError, res);
    next(err);
    return;
  } else if (!req.body.author) {
    responseUtils.errResponse(respConst.badRequestError, res);
    next(err);
    return;
  }
  next()
}

const updateArticleValid = (req, res, next) => {
  if (!req.body) {
    responseUtils.errResponse(respConst.noBodyError, res);
    next(err);
    return;
  } else if (!req.body.articleId) {
    responseUtils.errResponse(respConst.badRequestError, res);
    next(err);
    return;
  }
  next()
}

const getArticleByIdValid = (req, res, next) => {
  if (!req.params) {
    noParamError
    responseUtils.errResponse(respConst.noParamError, res);
    next(err);
    return;
  }
  if (!req.params.articleID) {
    responseUtils.errResponse(respConst.badRequestError, res);
    next(err);
    return;
  }
  next()
}

module.exports = {
    createArticleValid,
    updateArticleValid,
    getArticleByIdValid
};
