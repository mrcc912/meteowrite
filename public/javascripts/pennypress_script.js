var meteowrite_server = "http://ec2-54-224-28-145.compute-1.amazonaws.com:5000";
//var meteowrite_server = "http://ec2-50-19-172-168.compute-1.amazonaws.com:5000"

function userReadArticle(aid, uid, api_key)
{
    $.get(meteowrite_server + "/userReadArticle",
	  {
	      user: uid,
	      article: aid,
	      apikey: api_key
	  }).done(function(response){
	      console.log(response);
	  });
}

function addArticle(aid, title, author, URL, article_body,api_key, user, func)
{
    $.ajax({
	type: "POST",
	url: meteowrite_server + "/addArticle",
	data: {
	      id: aid,
	      headline: title,
	      biline: author,
	      body: article_body,
	      api_key: api_key,
	      URL: URL
	},
	success: function(data){
	    console.log("yay");
	    console.log(data);
	    func(aid, user, api_key);
	}
    });
}

$(function(){


    var elems= document.getElementsByClassName("post");
    var mw_articleID = elems[0].id.split("-")[1];    
    var title = elems[0].children[1].innerHTML;
    var byline = elems[0].children[2].innerHTML;
    var author = byline.split("|")[0];
    var date = byline.split("|")[1];
    var entry = elems[0].children[3];
    var body = "";
    for(var i=0; i<entry.children.length; i++)
	if(entry.children[i].nodeName == "P")
	    body += entry.children[i].innerHTML;
    var mw_userID = "IP";
    var mw_api = "1e2956a7d55d2317858cf4db7d564f676a34b249";
    addArticle(mw_articleID, title, author, document.href, body, mw_api, "IP", function(mw_articleID, mw_userID, mw_api){
	userReadArticle(mw_articleID, mw_userID, mw_api);
    });

    
});