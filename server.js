var express = require('express');
var app = express();
var path = require('path');
var axios = require('axios');

var client_id = 'a97816676173447190c178a15751903b';
var client_secret = '318a29cf3ebf44f99a1fbdc262300ed7';

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', function(req,res) {
	res.sendFile(path.resolve(__dirname, 'build','index.html'));
})

app.get('/auth', function(req,res) {
	axios({
		url: 'https://accounts.spotify.com/api/token',
		method: 'post',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' +  Buffer.from(client_id+':'+client_secret).toString('base64'),
		},
		params: {
			'grant_type': 'client_credentials'
		}
	})
	.then((data) => {
		console.log(data.data);
		res.send(data.data);
	})
	.catch((err) => {
		res.send(err);
	})
})

app.listen(process.env.PORT||3000, function() {
	console.log("server is listening on port 3000");
})

