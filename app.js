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
app.post('/articleRead', routes.userReadArticlePost);
app.get('/recentTweets', routes.recentTweets);

app.post('/readArticle', function(req, res){
    console.log(req.body);
    mongo.addArticle(
	req.body.id,
	req.body.headline,
	req.body.biline,
	req.body.creditline,
	req.body.source,
	req.body.section,
	req.body.url,
	req.body.body,
	function(obj){res.render('viewArticle', {title: "Article Reader"});}
    );
});

app.post("/articleParser", function(req, res){
    alchemy.getKeywords(123, req.body.body, function(id, obj){
	mongo.addKeywords(req.cookies.user, obj.keywords);
    });
    
});



/* Public API*/
app.get('/getTopKeywords', routes.getTopKeywords);
app.get('/getArticleReaderInterests', routes.getArticleReaderInterests);
app.get('/getAuthorKeywords', routes.getAuthorKeywords);
app.get('/getArticleFacebook', routes.getArticleFacebook);
app.get('/API', routes.API);
app.get('/userReadArticle', routes.userReadArticle);



function init()
{
    /*
      mongo.getAuthorKeywords("Mark Glover", "4efe22e97094d3c7231e6b061ae642a46e91fbb5", function(data){
	//console.log(data)
    });
    mongo.addAPIUser("Sacramento Bee");
    mongo.getTopKeywordsForArticle("5175ceadf13dad6f4a0edec2", 6, "4efe22e97094d3c7231e6b061ae642a46e91fbb5" , function(data){console.log(data);});
*/
    mongo.getArticleReaderInterests("5175ceadf13dad6f4a0edec2", "4efe22e97094d3c7231e6b061ae642a46e91fbb5", function(data){console.log(data);});
}

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
    init();
});

