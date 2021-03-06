/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, article = require('./routes/article')
, http = require('http')
, engine = require('ejs-locals')
, path = require('path')
, reader = require('file')
, mongo = require('database')
, alchemy = require('alchamy');;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.engine('ejs', engine);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/* Public API*/
app.get('/getTopKeywords', routes.getTopKeywords);
app.get('/getArticleReaderInterests', routes.getArticleReaderInterests);
app.get('/getAuthorKeywords', routes.getAuthorKeywords);
app.get('/getArticleFacebook', routes.getArticleFacebook);
app.get('/API', routes.API);
app.get('/addUser', routes.addUser);
app.get("/reccomendAd", routes.reccomendAd);
app.get('/sacbee', routes.sacbee);
app.get('/reportBarUse', routes.reportBarUse);
app.get('/userReadArticle', routes.userReadArticle);
app.post('/addArticle', routes.processArticle);

app.get('/', routes.index);
app.get('/articleReader', routes.articleReader);
app.get('/userRec', routes.userRec);
app.get('/getUser', routes.getUser);
app.get('/reccomend', routes.reccomend);
app.get('/portal', routes.portal);
app.get('/login', routes.login);
app.get('/articles', article.list);
app.get('/users', user.list);
app.get('/article', routes.article);
app.get('/user', routes.userPage);
app.get('/getarticle', routes.getArticle);
app.get('/articleRead', routes.userReadArticle);
app.get('/reccPost', routes.reccPost);
app.get('/articleOverlap', routes.articleOverlap);
app.post('/keywordResponse', routes.keywordResponse);
app.post('/keywordResponseRec', routes.keywordResponseRec);
app.get('/recentTweets', routes.recentTweets);
app.get("/getUser", routes.getUser);

app.get('/apiuse', routes.apiuse);
app.get('/testArticle', routes.testArticle);

/* Stats Dashboard*/
app.get("/metrics_dashboard", routes.metrics_view);
app.get("/metrics_login", routes.metrics_login);
app.post("/metrics_login_post", routes.metrics_login_post);

/* TESTING FUNCTIONS */

function removeTestUsers()
{
    mongo.removeUserByName("jdo");
    mongo.removeUserByName("janedo");
}

var datalog = function(data){console.log(data);}

function createTestUsers(reset)
{
    var john_do_params = {username: "jdo",
			  name: "John Doe",
			  hometown: "Houston, TX",
			  current_location: "Stanford, CA",
			  gender: "male",
			  languages: ["English", "Spanish"],
			  work: ["BMC Software Inc."]
			 };
    
    mongo.createUser(1, "4efe22e97094d3c7231e6b061ae642a46e91fbb5", john_do_params, datalog);
    var jane_do_params = {username: "janedo",
			  name : "Jane Doe",
			  hometown : "Austin, TX",
			  current_location :"Stanford, CA",
			  gender: "female",
			  languages : ["English", "Italian"],
			  work: ["BMC Software Inc."]
			 };
    mongo.createUser(2, "4efe22e97094d3c7231e6b061ae642a46e91fbb5", jane_do_params, datalog);

}
function init()
{
    
    //mongo.getAuthorKeywords("Mark Glover", "4efe22e97094d3c7231e6b061ae642a46e91fbb5", function(data){});
    //mongo.getTopKeywordsForArticle("5175ceadf13dad6f4a0edec2", 6, "4efe22e97094d3c7231e6b061ae642a46e91fbb5" , function(data){console.log(data);});

   // removeTestUsers();
    //createTestUsers();
    //mongo.getUsers("4efe22e97094d3c7231e6b061ae642a46e91fbb5", datalog);
    //mongo.userReadArticle("janedo", "5108195", function(data){});
    
    //mongo.getUser("jdo", function(data){console.log(data);});
    //mongo.getArticleReaderInterests("5108195", "4efe22e97094d3c7231e6b061ae642a46e91fbb5", function(data){console.log(data);});
    //mongo.addAPIUser("Sacramento Bee");
    //mongo.addAPIUser("Peninsula Press");
    //mongo.removeAPIUser("4efe22e97094d3c7231e6b061ae642a46e91fbb5");
    //mongo.reportAPIuse("4efe22e97094d3c7231e6b061ae642a46e91fbb5", "getTopKeywordsForArticle");
    //mongo.getAPIUseForKey("4efe22e97094d3c7231e6b061ae642a46e91fbb5", function(data){console.log(data);})
    //mongo.updateArticles("4efe22e97094d3c7231e6b061ae642a46e91fbb5");
    //mongo.clearAll("1e2956a7d55d2317858cf4db7d564f676a34b249");
}

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
    init();
});