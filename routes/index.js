
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
    mongo.addUser(req.cookies.user, req.cookies.name, req.cookies.hometown, req.cookies.location, req.cookies.gender, req.cookies.language.split(","), [req.cookies.work]);
    res.render('index', { title: 'Express' });
};

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
