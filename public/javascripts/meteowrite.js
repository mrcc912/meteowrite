
$(document).ready(function(){
    //var url = "http://ec2-54-235-227-153.compute-1.amazonaws.com:5000/articleParser";
    var url = "/articleParser";
    var data = new Object();
    var body = $("#articleBody");
    
    console.log(body);
    data["body"] = body;

    $.ajax({
	type: "POST",
	url: url,
	data: $.param(data),
	success: function(){console.log("success!!");}
    });
});