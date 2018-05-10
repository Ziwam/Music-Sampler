var axios = require('axios');

var client_id = 'a97816676173447190c178a15751903b';
var client_secret = '318a29cf3ebf44f99a1fbdc262300ed7';

export const getToken = () => axios({
	url: 'https://accounts.spotify.com/api/token',
	method: 'post',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': 'Basic ' +  Buffer.from(client_id+':'+client_secret).toString('base64')
	},
	params: {
		'grant_type': 'client_credentials'
	}
})