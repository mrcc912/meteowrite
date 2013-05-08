var sideBarOut  = true;
function show_admin_panel()
{
    if(sideBarOut)
    {
	//hide the sidebar
	console.log("hiding...");
	$("#admin-sidebar").animate({
	    width: 0,
	    border: "0px"
	}, 400, function(){
	    console.log("hidden");
	    sideBarOut = false;
	    $("#admin-sidebar").each(function(){
		$(this).hide();
	    });
	        //$("#container").hide();
	});

    }
    else
    {
	//show the sidebar
	console.log("showing...");

	$("#admin-sidebar").each(function(){
	    $(this).show();
	});
	$("#admin-sidebar").animate({
	    width: "30%",
	}, 400, function(){
	    console.log("open");
	    sideBarOut = true;
	    $("#admin sidebar").css('border', "5px solid blue");

	});


    }
};

function createPieChart(id, chartData, chartName, chartTitle)
{
    $('#' + id).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: chartTitle
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            percentageDecimals: 1
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Article Keywords',
            data: chartData
        }]
    });
 
}


function createBarChart(id, chartData, chartName, chartTitle)
{
    $("#" + id).highcharts({
	chart: {
	    type: "bar"
	},

	title: {
	    text: chartTitle
	},
	xAxis: {
	    categories: chartData[0],
	    title: { text: null }
	},
	yAxis: {
	    min: 0,
	    title: {
		text: "relevance",
		align: "high"
	    },
	    labels: {
		overflow: "justify"
	    }
	},
	tooltip: {
	    valueSuffix: ""
	},
	plotOptions: {
	    bar: {
		dataLabels: {
		    enabled: true
		}
	    }
	},
	series: [{
	    name: "relevance",
	    data: chartData[1]
	}]
    });
}

/*
$(function () {
    $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Relevant Keywords for this article'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            percentageDecimals: 1
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Article Keywords',
            data: [
                ['Dog',   45.0],
                ['Fly-fishing',       26.8],
                {
                    name: 'Trees',
                    y: 12.8,
                    sliced: false,
                    selected: true
                },
                ['Politics',    8.5],
                ['Sports',     6.2],
                ['Football',   0.7]
            ]
        }]
    });
});
*/

function getKeywords(id, num, api_key)
{
    var data = new Array();
    var labels  = new Array();
    var series = new Array();
    data.push(labels);
    data.push(series);
    //$.get("http://ec2-54-224-28-145.compute-1.amazonaws.com:5000/getTopKeywords",
    $.get("http://ec2-50-19-172-168.compute-1.amazonaws.com:5000/getTopKeywords",
	  {
	      article: id,
	      numResponses: num,
	      apikey: api_key
	  }).done(function(response){
	      var res = JSON.parse(response);
	      for(var word=0; word<res.length; word++)
	      {
		  data[0].push(res[word].text);
		  data[1].push(res[word].rel);
	      }
	      createBarChart("article_container", data, 'article_keywords', 'Article Keywords');
	  });

    
}


function readerInterests(id,api_key)
{
    var data = new Array();
    var labels  = new Array();
    var series = new Array();
    data.push(labels);
    data.push(series);
    $.get("http://ec2-50-19-172-168.compute-1.amazonaws.com:5000/getArticleReaderInterests",
	  //$.get("http://ec2-54-224-28-145.compute-1.amazonaws.com:5000/getArticleReaderInterests",
	  {
	      article: id,
	      apikey: api_key
	  }).done(function(response){
	      var res = JSON.parse(response);
	      console.log(response);
	      for(var word=0; word<res.length; word++)
	      {
		  data[0].push(res[word].text);
		  data[1].push(res[word].rel);
	      }
	      createBarChart("user_container", data, 'user_shared_interests', 'Shared Reader Interests');
	  });

}

function userReadArticle(aid, uid, api_key)
{
    $.get("http://ec2-50-19-172-168.compute-1.amazonaws.com:5000/userReadArticle",
    //$.get("http://ec2-54-224-28-145.compute-1.amazonaws.com:5000/userReadArticle",
	  {
	      user: uid,
	      article: aid,
	      apikey: api_key
	  }).done(function(response){
	      console.log(response);
	  });
}


function meteowrite(article_id, num, api_key, user_id)
{
    //include neccessary files
    var script_include = $('<script src="http://ec2-54-224-28-145.compute-1.amazonaws.com:5000/js/highcharts.js"> </script>');
    var style_include = $('<link rel="stylesheet" href="http://ec2-54-224-28-145.compute-1.amazonaws.com:5000/stylesheets/sidebar_style.css" />');
    $("head").append(script_include);
    $("head").append(style_include);
    //create sidebar
    var button = $('<button id="show_admin_button" onclick="show_admin_panel();"> Admin Panel </button>');
    var sidebar = $('<div id="admin-sidebar"></div>');
    var art_div = $('<div id="article_container"></div>');
    var user_div = $('<div id="user_container"></div>');
    sidebar.append(art_div);
    sidebar.append(user_div);
    $("body").append(sidebar);
    $("body").append(button);
    var article_id = "5108195";
    var num = 10;
    var api_key = ""
    var user_id = "jdo";

    userReadArticle(article_id, user_id, api_key);
    getKeywords(article_id, num, api_key);
    readerInterests(article_id, api_key);
}