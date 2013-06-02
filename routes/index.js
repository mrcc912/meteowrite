/*
 * GET home page.
 */
var util = require('util');
var alch = require("alchamy");
var mongo = require('database');
var sys = require('sys');
var exec = require('child_process').exec,
child;
var twitter = require("twitter");

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

exports.runPyScript = function(req, res) {
  child = exec('./executed.py',
  function(error, stdout, stderr) { 
  
    if(error != null) {
      console.log('exec error: ' + error);
    }
    console.log("garbage");
  }
  );
};

exports.article = function(req, res)
{
    mongo.addUser(req.cookies.user, req.cookies.name, req.cookies.hometown, req.cookies.location, req.cookies.gender, req.cookies.language.split(","), [req.cookies.work]);
    res.render('article', {title: "article"});
};

exports.articleOverlap = function(req, res) {
  mongo.articleOverlap(function(obj) {
    res.render('artO', {title: "Article Overlap", objInterest: obj});
  });
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
    //var username = req.query.username;
    mongo.getUser(req.query.userID, function(userObj) {
	res.render("getUser", {title: "User Page", user: userObj });
    });
}

exports.userReadArticlePost = function(req, res) {
  var userid = req.body.userid;
  var articleid = req.body.articleid;
  mongo.userReadArticle(userid, articleid, function(userObj){
        res.render("getUser", {title: "User Page",user: userObj });
  });
};

exports.keywordResponseRec = function(req, res) {
  var username = req.body.username;
  var keywords = req.body.KEYWORD;
  var numRec = req.body.numRec;
  /*mongo.addWordsToUserBlacklist(username,keywords,function(user) {
  
    mongo.relatedArticlesForUserObj(user, numRec, function(topMap) {
      res.render("userRec", {
          title: "User Reccomendation",
          user: username,
          numRec: numRec,
          keyMap:topMap
      });
    });
  });*/
}


exports.keywordResponse = function(req, res) {
  var username = req.body.username;
  var keywords = req.body.KEYWORD;
  mongo.addWordsToUserBlacklist(username,keywords,function(userObj) {
    res.render("getUser", {title: "User Page", user:userObj });
  });
}
  
exports.userRec = function(req, res)
{       
    var numRec = req.query.numrec; 
    var username = req.query.username;
    var api = req.query.apikey;
    mongo.relatedArticlesForUser(username, numRec, api, function(topMap) {   
	res.render("userRec", {
	    title: "User Reccomendation",
            user: username,
            numRec: numRec,
	    keyMap:topMap 
	});
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
	mongo.getArticlesRelatedToFacebook(req.cookies.user, req.query.userid, token, req.query.apikey, function(obj){
	    for(num in obj)
	    {
	    }
	    res.render('facebookRec', {
		title: "User Reccomendation",
		user: req.cookies.user,
		recs: obj
	    });
	});
    }
};


exports.recentTweets = function(req, res)
{
    twitter.getRecentTweets("mrcc912");
}


exports.testArticle = function(req, res)
{
    res.render('test_article');
}


/* PUBLIC API ROUTES */

exports.getTopKeywords = function(req, res)
{
    mongo.getTopKeywordsForArticle(req.query.article, req.query.numResponses, req.query.apikey, function(data){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.end(JSON.stringify(data));

    });
}

exports.getArticleReaderInterests = function(req, res)
{
    mongo.getArticleReaderInterests(req.query.article, req.query.apikey, function(data){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.end(JSON.stringify(data));
    });
}

exports.getAuthorKeywords = function(req, res)
{
    mongo.getAuthorKeywords(req.query.author, req.query.apikey, function(data){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.end(JSON.stringify(data));
    });
}

exports.getArticleFacebook = function(req, res)
{
    mongo.getArticleFacebook(req.query.article, req.query.apikey, function(data){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.end(JSON.stringify(data));
    });
}

exports.API = function(req, res)
{
    res.render('API');
}


function parseUserId(req)
{
    if(req.query.user == "IP")
    {
	var id = req.connection.remoteAddress
	var newID = id.split(".").join("");
	return newID;
    }
    else return req.query.user
}
exports.userReadArticle = function(req, res) {
    var userID = parseUserId(req);
    mongo.userReadArticle(userID, req.query.article, req.query.apikey, function(data){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.end(JSON.stringify(data));
    });
};

exports.getUser = function(req, res)
{
    mongo.getUsersWithParameters(req.query.params,req.query.apikey, function(data){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.end(JSON.stringify(data));
    });
}

exports.reccomendAd = function(req, res)
{
    mongo.reccomendAd(req.query.user, req.query.ads, req.query.apikey, function(data){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.end(JSON.stringify(data));
    });
}

exports.sacbee = function(req, res)
{
    if(!req.query.article_id)
	req.query.article_id = 4458591;
    if(!req.query.api_key)
	var api = "4efe22e97094d3c7231e6b061ae642a46e91fbb5";
    else
	var api = req.query.api_key;
    mongo.getArticle(req.query.article_id, api, function(data){
	if(data != -1)
	{
	    res.render('sacbee',{
		art: data,
		title: "Sacbee Article"
	    });
	}
	else
	{
	    res.render('sabee', {
		article_id: "",
		body: "Could not find article with that id",
		biline: "",
		headline: "",
		title: "Sacbee Article"
	    });
	}
    });
}

exports.processArticle = function(req, res) {

    mongo.reportAPIuse(req.body.api_key, "addArticle");  
    var id = req.body.id;
    if(id == null) {
	return;
    }
    var headline = req.body.headline;
    if(headline == null) {
	return;
    }
  
    var biline = req.body.biline;
    if(biline == null) {
	biline = ""; 
    }
    var creditline = req.body.creditline;
    if(creditline == null) {
	creditline = ""; 
    }
    var source = req.body.source;
    if(source == null) {
	source = ""; 
    }
    var section = req.body.section;
    if(section == null) {
	section = "";
    }
    var URL = req.body.URL;
    if(URL == null) {
	URL = "";
    }
    var body = req.body.body;
    if(body == null) {
	return;
    } 
    var apikey = req.body.api_key;
    if(apikey == null)
	apikey = "";

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    mongo.checkArticleExistence(id, apikey, function(data){
	if(data){
	    res.end("Article already exists");
	}
	else{
	    var encodedId = encodeURIComponent(id);
	    var encodedHeadline = encodeURIComponent(headline);
	    var encodedBiline = encodeURIComponent(biline);
	    var encodedCreditline = encodeURIComponent(creditline);
	    var encodedSource = encodeURIComponent(source);
	    var encodedSection = encodeURIComponent(section);
	    var encodedURL = encodeURIComponent(URL);
	    var encodedBody = encodeURIComponent(body);
	    var encodedAPI = encodeURIComponent(apikey);
	    var commandLine = util.format('./executed.py "%s" "%s" "%s" "%s" "%s" "%s" "%s" "%s" "%s"', encodedId, encodedHeadline, encodedBiline, encodedCreditline, encodedSource, encodedSection, encodedURL, encodedBody, encodedAPI);
	    child = exec(commandLine,
			 function(error, stdout, stderr) {
			     console.log('exec stdoout: ' + stdout)
			     if(error != null) {
				 console.log('exec error: ' + error);
			     }
			     res.end("Upload Complete");
			 }
			);
	}
    });    			
};

exports.addUser = function(req, res){
    mongo.addUser(req.query.username, req.query.apikey, req.query.params); 
};

exports.getArticle = function(req, res) {
    var articleId = req.query.articleID;
    mongo.getArticle(articleId, req.query.apikey, function(art) {
	res.render("getArticle", {title: "Single Article", article: art});
    });
};

exports.reportBarUse = function(req, res)
{
    mongo.reportBarUse(req.query.api_key, req.query.duration, function(data){
    });
};

exports.apiuse = function(req, res)
{
    mongo.getAllAPIUse(function(data){
	res.render('apiuse', {stats: data});
    });
}



/*************************************************************
**************************************************************
**************************************************************
**************************************************************
________________STATISTICS PORTAL_____________________________
*************************************************************
**************************************************************
**************************************************************
*************************************************************/

exports.metrics_login = function(req, res)
{
    res.render('metrics_login', {
	title: "Metrics Login",
	error_message: ""
    });
}

exports.metrics_view = function(req, res)
{
    mongo.getArticles(req.query.api_key, function(articles){
	res.render('metrics_view', {
	    title: "Metrics Homepage",
	    articles: articles
	});    
    });
/*
    if(req.session.user){
	res.render('metrics_view', {
	    title: "Metrics Homepage"
	});
    }
    else
    {    
	res.render('metrics_login', {
	    title: "Metrics Login",
	    error_message: ""
	});
    } 
*/
}

exports.metrics_login_post = function(req, res)
{
    //check login
    mongo.metrics_user_login(req.body.username, req.body.password, function(data){
	if(!data)
	{
	    console.log("ERROR HERE, NULL RETURN VALUE!!");
	}
	if(data == -2)
	{
	    res.render('metrics_login', {
		title: "Metrics Login",
		error_message: "Could not find that username"
	    });	    
	}
	if(data == -1)
	{
	    res.render('Metrics_login', {
		title: "Metrics Login",
		error_message: "Incorrect Username/Password"
	    });	    
	}
	else
	{
	    mongo.getArticles(req.query.api_key, function(articles){
		res.render('metrics_view', {
		    title: "Metrics Homepage",
		    articles: articles
		});    
	    });
	}
    });
}