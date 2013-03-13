/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , engine = require('ejs-locals')
  , path = require('path')
  , reader = require('file')
  , mongo = require('database');

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
    console.log("yay"); 
    console.log(req.body.body);

    mongo.addArticle("123", "", "", "", "", "", "", body, function(obj){
			 alchemy.getKeywords(obj._id, obj.body, function(obj){
			     console.log(obj);
			 });
		     });
});

app.get('/users', user.list);

app.get('/article', routes.article);
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
