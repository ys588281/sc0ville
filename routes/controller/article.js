const uuidv1 = require('uuid/v1')
const articleRepo = require("../../model/repository/articleRepo.js");
const respUtils = require("../../utils/resp.js");
const dateUtils = require("../../utils/date.js");
const validation = require("./validation.js");
const respConst = require('../../constants/resp')

const createArticle = (req, res, next) => {
    const articleModel = convertBodyToArticle(req, true)
    articleRepo.createArticle(articleModel)
    .then( data => {
      console.log('createArticle data: ', data)
      const message = {
        "articleId": data['_id']
      }
      respUtils.jsonResponse(message, res);
      Promise.resolve(data);
    })
    .catch( err => {
      console.log("createArticle err: ", err);
      respUtils.errResponse(respConst.dbError, res);
    })
}

const getArticleByID = (req, res, next) => {
    articleRepo.getArticleByID(req.params.articleID)
    .then( data => {
      if (data == null) {
        respUtils.errResponse(respConst.notFoundError, res);
        return
      }
      console.log('getArticleByID: ', data)
      respUtils.jsonResponse(convertArticleToJson(data), res);
      Promise.resolve(data);
    })
    .catch( err => {
      console.log("getArticleByID err: ", err);
      respUtils.errResponse(respConst.dbError, res);
    })
}

const updateArticleByID = (req, res, next) => {
    articleRepo.getArticleByID(req.params.articleID)
    .then( data => {
      if (data == null) {
        const err = {
          status: 400,
          reason: "invalid aticle id"
        }
        respUtils.errResponse(err, res);
        return
      }
      Promise.resolve(data);
    })
    .catch( err => {
      console.log("updateArticleByID get article err: ", err);
      respUtils.errResponse(respConst.dbError, res);
    })

    const articleModel = convertBodyToArticle(req, false)
    articleRepo.updateArticleByID(req.body.articleId, articleModel)
    .then( data => {
      console.log('updateArticleByID data: ', data)
      const message = {
        "articleId": data['_id']
      }
      respUtils.jsonResponse(message, res);
      Promise.resolve(data);
    })
    .catch( err => {
      console.log("updateArticleByID err: ", err);
      respUtils.errResponse(respConst.dbError, res);
    })
}

const getArticleList = (req, res, next) => {
  articleRepo.getArticleList(req.query)
  .then( data => {
    console.log('getArticleList data: ', data)
    if (data == null || data.length == 0) {
      respUtils.errResponse(respConst.notFoundError, res);
      return
    }
    let resp = []
    data.forEach( d => {
      resp.push(convertArticleToJson(d))
    })
    const message = {
      "articleList": resp
    }
    respUtils.jsonResponse(message, res);
    Promise.resolve(data);
  }).catch(err => {
    console.log("updateArticleByID err: ", err);
    respUtils.errResponse(respConst.dbError, res);
  })
}

const convertBodyToArticle = (req, isCreate) => {
  let articleModel = {
    Author: req.body.author,
    Title: req.body.title,
    Description: req.body.description,
    Thumbnail: req.body.thumbnail,
    Status: req.body.status,
    KeyWords: req.body.keywords,
    Details: req.body.details,
    ExternalLinks: req.body.externalLinks,
    IssueDate: dateUtils.dateFormat(req.body.issueDate),
  }
  if (isCreate) {
    articleModel.ArticleID = uuidv1();
    articleModel.CreateDate = new Date();
    articleModel.Status = "created";
  }
  console.log('articleModel: ', articleModel)
  return articleModel
}

const convertArticleToJson = (data) => {
  return {
    articleId: data['_id'],
    title: data.Title,
    description: data.Description,
    thumbnail: data.Thumbnail,
    status: data.Status,
    keywords: data.KeyWords,
    externalLinks: convertExternalLinks(data.ExternalLinks),
    details: convertDetails(data.Details),
    issueDate: data.IssueDate,
  }
}

const convertExternalLinks = (links) => {
  let externalLinks = []
  links.forEach( l => {
    externalLinks.push({
      Platform: l.Platform,
      Link: l.Link
    })
  })
  return externalLinks
}

const convertDetails = (mDetails) => {
  let details = []
  mDetails.forEach( l => {
    details.push({
      SubTitle: l.SubTitle,
      Content: l.Content
    })
  })
  return details
}


module.exports = {
    createArticle,
    getArticleByID,
    updateArticleByID,
    getArticleList
};
