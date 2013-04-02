
/*
 * GET users listing.
 */

var mongo = require('database');

exports.list = function(req, res){
  mongo.getArticles(function(articles) {
    res.render("articles", {title: "Article IDS", articleList: articles});
  });
};
