var express = require('express'), http = require('http'), querystring = require('querystring');

var hapikeyCopy = ''; //Purakai

var hapikeyPaste = ''; //AY

var url = 'http://api.hubapi.com/content/api/v2/pages?hapikey=' + hapikeyCopy + "&limit=200";

var app = express();

var favPage = {};

var layoutUrl = 'http://api.hubapi.com/content/api/v2/layouts?hapikey=' + hapikeyCopy + '&limit=200';

function getLayout(callback){
	return http.get(layoutUrl, function(res){
		var body = '';
		var myTemplate = {};
		res.on('data', function(chunk){
			body += chunk;
		})
		res.on('end', function(chunk){
			var JSONbody = JSON.parse(body);
			console.log(JSONbody.objects.length);
			for (var i = 0; i<JSONbody.objects.length; i++){
				if (JSONbody.objects[i].label.indexOf('new product page template (Clone)') != -1){
					myTemplate = JSONbody.objects[i];
					callback(myTemplate);
				}
			}
		})
	})
}

function createLayout(layout){
	console.log(JSON.stringify(layout.layout_data));
}

getLayout(createLayout);

function pages(callback){
	return http.get(url, function(res){
		var body = '';
		res.on('data', function(chunk){
			body += chunk
		});
		res.on('end', function(chunk){
			var JSONbody = JSON.parse(body);
		
			for (var i = 0; i<JSONbody.objects.length; i++){
		
				if (JSONbody.objects[i].name.indexOf('Sustainable Surf Easy Tank') != -1){
					favPage = JSONbody.objects[i];
					callback(favPage);
				}
				
				//console.log(JSONbody.objects[i].id + ": " + JSONbody.objects[i].name + " Widgets: ");	
				/*if(JSONbody.objects[i].widgets['left_column']){
					var widgets = JSONbody.objects[i].widgets['left_column']['body'];
					//console.log(widgets);	//how to write this to the browser? If there's even a need
				};*/
				
		//how to understand which modules are needed? 

		//The goal is to create the template you like, grab the names of all the modules, populate those modules
		//with new HTML based on values in the database.				
				
			}
			
			
		})
		
	});

}

var hostname = 'api.hubapi.com';
var path = '/content/api/v2/pages?hapikey='+hapikeyPaste;

var options = {
	method: 'POST',
	hostname: hostname,
	path: path
}

function newPage(page){
	var myPage = JSON.stringify(page);
	var req = http.request(options, function(res){
		res.on('data', function (chunk) {
    		console.log('BODY: ' + chunk);
  		});
		console.log('STATUS: ' + res.statusCode);
	});
	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});
	req.write(myPage);
	req.end();
}

//pages(newPage);



app.listen(8080);
