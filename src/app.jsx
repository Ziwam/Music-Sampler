import React, { Component} from 'react';
import './app.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './profile';
import Gallery from './gallery';
import * as spotifyAPI from './spotifyapi';

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			token: '',
			query: '',
			artist: null,
			tracks: []
		}
	}

	componentDidMount() {
		spotifyAPI.getToken()
		.then((res) => {
			this.setState({token: res.access_token})
		})
		.catch((err) => {
			console.log(err);
		})
	}

	search() {
		const headers = {
			'Authorization': 'Bearer ' + this.state.token,
			'content-type': 'application/json'
			}

		const ARTIST_URL = `https://api.spotify.com/v1/search?q=${this.state.query}&type=artist&limit=1`;

		fetch(ARTIST_URL,{
			method: 'get',
			headers: headers
		})
		.then( res => res.json())
		.then(data => {
			// console.log(data);
			const artist = data.artists.items[0];
			const ALBUM_URL = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=US&`;
			this.setState({artist});
			// console.log(artist.id);

			fetch(ALBUM_URL,{
				method: 'get',
				headers: headers
			})
			.then( res => res.json())
			.then(data => {
				const {tracks} = data;
				this.setState({tracks});
			});
		});
	}

	render() {
		return (
			<div className="App">
				<div className="App-title">Music Sampler</div>
				<FormGroup>
					<InputGroup>
						<FormControl
							text="text"
							placeholder="search for an artist"
							query={this.state.query}
							onChange={ev => this.setState({query: ev.target.value})}
							onKeyPress = {ev => {
								if(ev.key ==='Enter') this.search()
							}}
						/>
						<InputGroup.Addon onClick = {()=>this.search()}>
							<Glyphicon glyph = "search"></Glyphicon>
						</InputGroup.Addon>
					</InputGroup>
				</FormGroup>
				{
					this.state.artist !== null 
					?
					<div>
						<Profile
							artist ={this.state.artist}
						/>
						<Gallery
							tracks={this.state.tracks}
						/>					
					</div>
					: <div></div>
				}
			</div>
		)
	}
}

export default App;