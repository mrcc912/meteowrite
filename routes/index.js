
/*
 * GET home page.
 */

alch = require("alchamy");

exports.index = function(req, res){
  alch.getKeywords('hi')
  res.render('index', { title: 'Express' });
};

exports.article = function(req, res)
{
    res.render('article', {title: "article"});
};

exports.articleReader = function(req, res){
    res.render('articleReader', {title: "Article Entry"});
};

