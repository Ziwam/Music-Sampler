var express = require('express');
var app = express();
var path = require('path');
var axios = require('axios');
var cors = require('cors');

var client_id = 'a97816676173447190c178a15751903b';
var client_secret = '318a29cf3ebf44f99a1fbdc262300ed7';

app.use(cors({credentials: true, origin: true}));

app.get('/',function (req,res) {
	res.send('hello world');
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

var port = 4000;

app.listen(port, function() {
	console.log("server is listening on port " +port);
})