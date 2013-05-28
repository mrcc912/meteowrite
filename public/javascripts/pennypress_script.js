var meteowrite_server = "http://ec2-54-224-28-145.compute-1.amazonaws.com:5000";


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
var mw_articleID = 1045;
var mw_userID = "IP";
var mw_api = "1e2956a7d55d2317858cf4db7d564f676a34b249";
userReadArticle(mw_articleID, mw_userID, mw_api);

    /*
var post = $(".post:first");
console.log(post.html);
var title = $(".title:first");
console.log(title.html);
var byline = $(".stats:first");
console.log(byline.html);

*/

//var content = $("#content");
var elems = document.getElementsByClassName("post");
var elem = elems[1];
for(index in elems)
{
    console.log(elems[index]);
}
console.log(elems);
console.log(elem);