const moment = require('moment')
const articleModel = require("../models/article.js");
const utils = require("../../utils/index.js");

const createArticle = (article) => {
  return articleModel.create(article)
}

const getArticleByID = (articleID) => {
  return articleModel.findById(articleID).exec()
}

const updateArticleByID = (articleID, article) => {
  return articleModel.findByIdAndUpdate(articleID, article).exec()
}

const getArticleList = (params) => {
  let queryParams = {}
  if (params.title && params.title != '') {
    queryParams.Title = params.title
  }
  if (params.author && params.author != '') {
    queryParams.Author = params.author
  }
  if (params.keywords && params.keywords.length > 0) {
    queryParams.KeyWords = params.keywords
  }
  if (params.start && params.start != '') {
    queryParams.IssueDate = { $gte: utils.date.dateFormat(params.start) }
  }
  if (params.end && params.end != '') {
    queryParams.IssueDate = { $lte: utils.date.dateFormat(params.end) }
  }
  let limit = 10, skip = 0
  if (params.limit && params.limit > 0) {
    limit = Number(params.limit)
  }
  if (params.skip && params.skip > 0) {
    skip = Number(params.skip * limit)
  }

  console.log('queryParams: ', queryParams)
  console.log('skip and limit: ', skip, limit)
  return articleModel.find({Title: 'test'}).skip(skip).limit(limit).exec()
}


module.exports = {
    createArticle,
    getArticleByID,
    updateArticleByID,
    getArticleList
}
