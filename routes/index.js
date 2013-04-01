
/*
 * GET home page.
 */

var alch = require("alchamy");
var mongo = require('database');

exports.login = function(req, res)
{

    res.render('login', { title: "login"});
};

exports.index = function(req, res){
    if(!req.cookies.user)
    {
	res.render('login', { title: "login"});
    }
    //mongo.addUser(req.cookies.user, req.cookies.name, req.cookies.hometown, req.cookies.location, req.cookies.gender, req.cookies.language.split(","), [req.cookies.work]);
    else
    {
	res.render('index', { title: 'Express' });
    }
};

exports.getArticle = function(req, res) {
  var articleId = req.query.articleID;
  mongo.getArticle(articleId, function(art) {
    res.render("getArticle", {title: "Single Article", article: art});
  });
}

exports.article = function(req, res)
{
    mongo.addUser(req.cookies.user, req.cookies.name, req.cookies.hometown, req.cookies.location, req.cookies.gender, req.cookies.language.split(","), [req.cookies.work]);
    console.log(req.cookies);
    console.log(req.cookies.user);
    res.render('article', {title: "article"});
};

exports.articleReader = function(req, res){
        mongo.addUser(req.cookies.user, req.cookies.name, req.cookies.hometown, req.cookies.location, req.cookies.gender, req.cookies.language.split(","), [req.cookies.work]);
    res.render('articleReader', {title: "Article Entry"});
};

exports.userPage = function(req, res){
    var username = req.query.username;
        mongo.addUser(req.cookies.user, req.cookies.name, req.cookies.hometown, req.cookies.location, req.cookies.gender, req.cookies.language.split(","), [req.cookies.work]);
    mongo.getUser(username, function(userObj){
	res.render("user", {title: "User Page",user: userObj });
    });
};

exports.getUser = function(req, res) {
  var username = req.query.username;
  mongo.getUser(username, function(userObj) {
    res.render("getUser", {title: "User Page", user: userObj });
  });
}

exports.userReadArticle = function(req, res) {
  var userid = req.query.userid;
  var articleid = req.query.articleid;
  mongo.userReadArticle(userid, articleid, function(userObj){
	res.render("getUser", {title: "User Page",user: userObj });
  });
};

exports.userReadArticlePost = function(req, res) {
  var userid = req.body.userid;
  var articleid = req.body.articleid;
  mongo.userReadArticle(userid, articleid, function(userObj){
        res.render("getUser", {title: "User Page",user: userObj });
  });
};

exports.keywordResponse = function(req, res) {
  console.log("in response post");
  console.log(req.body);
}
  
exports.userRec = function(req, res)
{
    var article1 = "oz";
    var article2 = "mother goose";
    var article3 = "dr. dre";
    var keyMap1 = new Object();
    keyMap1["lion"] = 500;
    keyMap1["tiger"] = 400;
    keyMap1["bear"] = 300;
    var keyMap2 = new Object();
    keyMap2["three"] = 500;
    keyMap2["blind"] = 400;
    keyMap2["mice"] = 300;
    var keyMap3 = new Object();
    keyMap3["whats"] = 500;
    keyMap3["the"] = 300;
    keyMap3["difference"] = 400;
    
    var topMap = new Object();
    topMap[article1] = keyMap1;
    topMap[article2] = keyMap2;
    topMap[article3] = keyMap3;

    res.render("userRec", {
	title: "User Reccomendation",
	keyMap:topMap 
    });
};

exports.reccomend = function(req, res)
{
    res.render("reccomend", {
	title: "Find Reccomendations"
    });
};

exports.portal = function(req, res)
{
    res.render("portal", {
	title: "Portal"
    });
};

exports.reccPost = function(req, res)
{
    var facebookUsage = req.query.slider;
    var article = req.query.article;
    var token = req.cookies.fbtoken;

    if(article!="")
    {
	
	// get article data
	// search through all articles finding related articles to the article
	// search for related articles to the user
	// find the articles that are in both
	// find articles related to facebook data
    }
    else
    {
	// get user data
	// find articles related to facebook data
	// weight significance by slider value
	// return top three
	mongo.getArticlesRelatedToFacebook(req.cookies.user, token,  function(obj){
	    console.log(obj);
	    for(num in obj)
	    {
		console.log(obj[num]);
	    }
	    res.render('facebookRec', {
		title: "User Reccomendation",
		user: req.cookies.user,
		recs: obj
	    });
	});
    }
};
