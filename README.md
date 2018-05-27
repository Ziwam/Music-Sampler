# Music Sampler
This is a web app that delivers short 30 second soundtracks to users through the use of Spotify's API. Users can search for an artist and retrieve the top 10 tracks for that artist. Server to server authentication allows the user free use of the search API without providing client information. An access token is received from every initial POST request made to Spotify on startup. Tokens expire after an hour of use.
## Table of Contents
- [Demo](#demo)
- [Implementation](#implementation)
- [Deployment](#deployment)
- [Technologies](#technologies)
- [License](#license)
## Demo
![music sampler](https://lh3.googleusercontent.com/SRzxYdyY46SRhT6H4qvq5qpSYrf-jS5D9L9OhdifMIGD8aW7JNa8ESM4kDYfURJd88qffsDpLsvNhFvRPHV2sztkf_tb6zI4EZdNc7jdNJVOH3eEmYCL-GtcFPamvElR3dCiqHvAPJteloILereBzzKdsTwmEnl01UtOnykSEvH9kKHaba-z281jUH2hvONbDPvcJ86UIo2yTzZoIZ04DJLLxxISGYyAxrQBBxY6AT7TYQUOUFeT25yYPoRKTS2FHwB2qtu2X--Ylv5bweb1vQ1QSI6Gyf-T_TkJs1m7Q6ovasZbtbZEw2wwnIk9Kd7qT8605SHLLqfpyObHFy8IbWxUWfjnv748fflFKyezEol3g5pduKBRw0-Wu4gCLnWhu2e6n4xYvgxdJ4nmytRouvIsJEuFsuFsSEHVWfxh9DZWSXhBdhO86eAPVzKOV8882D368nYza1Paq8-sylWufXLtovhRO20_8q84k27NB9Nsp0jRSMu5Vc7NKmYD-Qs7xhe97G3qOoWX6WZmnZYPpAiNvqU9iwS6s8CbKLRDwLNvUIOy_1fXAzKUssNoevtgVtgwMylX9ieoJl3xEkWsJkaVdJZMwTugPgC-sbg=w1024-h900-no)
The app is currently live: https://ms-zm.herokuapp.com/
## Implementation
To clone this repository you need [Git](https://git-scm.com/), [Node](https://nodejs.org/) and Node's package manager ([npm](https://www.npmjs.com/)) installed on your computer.
### Dependencies
```
"dependencies": {
    "axios": "^0.18.0",
    "express": "^4.16.3",
    "node-sass-chokidar": "^1.3.0",
    "npm-run-all": "^4.1.3",
    "react": "^16.3.2",
    "react-dom": "^16.3.2",
    "react-scripts": "1.1.4"
},
"devDependencies": {
    "cors": "^2.8.4",
    "nodemon": "^1.17.4"
}
```
### Installation
```bash
# clone the repo
$ git clone https://github.com/Ziwam/music-sampler.git

# go into the repo
$ cd music-sampler

# install the dependencies
$ npm install

# start the app
$ npm run start-css
```
## Deployment
Create a development-ready build be running.
```bash
$ npm run build
```
A folder called build will appear in the root of the project. If you wish to change to name of the folder, don't forget to change the path in the **server.js** file to the appropriate life name.
## Technologies
This project includes:
- [React](https://reactjs.org/)
- [Spotify API](https://developer.spotify.com/web-api/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sass](https://sass-lang.com/)
## License
(MIT License)
The MIT License (MIT) Copyright (c) 2018 Ziwa Mukungu zmukungu@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
