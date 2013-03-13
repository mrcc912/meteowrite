
/*
 * GET home page.
 */

alch = require("alchamy");


exports.login = function(req, res)
{
    res.render('login', { title: "login"});
};

exports.index = function(req, res){
  alch.getKeywords('hi')
  res.render('index', { title: 'Express' });
};

exports.article = function(req, res)
{
    console.log(req.cookies.user);
    res.render('article', {title: "article"});
};

exports.articleReader = function(req, res){
    res.render('articleReader', {title: "Article Entry"});
};

