
$(document).ready(function(){
  console.log("where you at");
  var url = "http://ec2-54-235-227-153.compute-1.amazonaws.com:5000/articleParser";
    //var url = "/articleParser";
    var data = {};
    var body = $("#articlebody").text();
    var n=body.indexOf("© Copyright The Sacramento Bee.  All rights reserved.");
    body = body.substring(0,n);
    body = body.trim();
    console.log(body);
    
    data.body = body;

    $.ajax({
	type: "POST",
	url: url,
	data: data,
	success: function(){console.log("success!!");}
    });
   
});
