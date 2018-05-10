import axios from 'axios';

var client_id = 'a97816676173447190c178a15751903b';
var client_secret = '318a29cf3ebf44f99a1fbdc262300ed7';

export const getToken = () => axios('/auth');