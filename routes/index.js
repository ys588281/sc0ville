const express = require('express');
const utils = require('../utils/index.js');
const articleController = require("./controller/article.js");
const validation = require("./controller/validation.js");


const router = express.Router();


router.use( (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, content-type, X-API-KEY, Access-Control-Request-Methods");
	next();
});

router.route("/articles").post(utils.token.verifyToken, validation.createArticleValid, articleController.createArticle);

router.route("/articles").put(utils.token.verifyToken, validation.updateArticleValid, articleController.updateArticleByID);
//
router.route("/articles/").get(utils.token.verifyToken, articleController.getArticleList);

router.route("/articles/:articleID").get(utils.token.verifyToken, validation.getArticleByIdValid, articleController.getArticleByID);

module.exports = router;
