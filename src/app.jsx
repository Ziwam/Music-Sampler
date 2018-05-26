import React, { Component} from 'react';
import Profile from './profile';
import Gallery from './gallery';
import Menu from './menu_bar';
import axios from 'axios';
import search_icon from './assets/search-icon.svg';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			token: '',
			query: '',
			artist: null,
			tracks: [],
			cached_tracks: [],
			audio: null,
			playingUrl: '',
			playing_track: null,
			playing_track_index: -1,
			playing: false
		}
	}

	componentDidMount() {
		const path = process.env.NODE_ENV==='development'? 'http://localhost:4000/auth':'/auth';

		axios(path)
		.then((res) => {
			this.setState({token: res.data.access_token})
		})
		.catch((err) => {
			console.log(err);
		})
	}

	search() {
		if(!this.state.query){
			return;
		}

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
			this.setState({artist,  query: ''});
			// console.log(artist.id);

			fetch(ALBUM_URL,{
				method: 'get',
				headers: headers
			})
			.then( res => res.json())
			.then(data => {
				let {tracks} = data;
				let tracklist = this.filterTracks(tracks);
				this.setState({tracks: tracklist});
			})
			.catch(err => {
				console.log(err);
			})
		})
		.catch(err => {
			console.log(err);
		})
	}

	filterTracks = (obj) => {
		let array = Object.keys(obj).map((key)=>{
			return obj[key];
		})
		return array.filter((tck)=>tck.preview_url!==null);
	}

	playAudio = (num,checkCached) => {
		let track = null;
		if(checkCached){
			if(this.state.cached_tracks !== this.state.tracks){
				track = this.state.cached_tracks[num];				
			}else {
				track = this.state.tracks[num];				
			}
		}else {
			track = this.state.tracks[num];
		}

		const previewUrl = track.preview_url;

		let audio = new Audio(previewUrl);
		if(!this.state.playing) {
			audio.play();
			this.setState({
				playing: true,
				playingUrl: previewUrl,
				audio,
				playing_track_index: num,
				playing_track: track,
				cached_tracks: this.state.tracks
			})
		} else {
			if (this.state.playingUrl === previewUrl) {
				this.state.audio.pause();
				this.setState({
					playing: false,
					playingUrl: '',
					playing_track_index: num
				})
			} else {
				this.state.audio.pause();
				audio.play();
				this.setState({
					playing: true,
					playingUrl: previewUrl,
					audio,
					playing_track_index: num,
					playing_track: track,
					cached_tracks: this.state.tracks
				})
			}
		}
	}

	pauseAudio = (forcePause = false) => {
		if(forcePause){
			this.setState({playing: false})
			this.state.audio.pause()
			let trk = this.state.audio;
			trk.currentTime = 0;
			this.setState({audio: trk})
		}else if(this.state.audio.paused) {
			this.state.audio.play()
			this.setState({playing: true})
		} else {
			this.setState({playing: false})
			this.state.audio.pause()
		}
	}

	changeTrack = (bool) => {
		let index = this.state.playing_track_index;
		let length =this.state.cached_tracks.length;
		if(index>-1 && index<length) {

			if(index === 0 && bool){
				return;
			}else if (index === length-1 && !bool){
				return;
			}else {			
				(bool)
				? this.playAudio(--index,true)
				: this.playAudio(++index,true)
			}
		}
	}

	render() {
		return (
			<div className="App">
				<div className="search">
					<div className="title">MS</div>
					<div className="inputfield">					
						<input
							text="text"
							placeholder="search an artist..."
							className="text"
							value={this.state.query}
							onChange={ev => this.setState({query: ev.target.value})}
							onKeyPress = {ev => {
								if(ev.key ==='Enter') this.search()
							}}
						/>
						<button 
							className="submit"
							onClick = {()=>this.search()}>
							<img src={search_icon} alt="search icon"/>
						</button>
					</div>
				</div>
				{
					this.state.artist !== null 
					?
					<div>
						<Profile
							artist = {this.state.artist}
						/>
						<Gallery
							tracks = {this.state.tracks}
							trackURL = {this.state.playingUrl}
							playTrack = {this.playAudio}
							playIndex= {this.state.playing_track_index}
							isPlay = {this.state.playing}
							pause = {this.pauseAudio}
						/>
					</div>
					: <div></div>
				}
				<Menu
					tracks = {this.state.tracks}
					playingTrack = {this.state.playing_track}
					audio = {this.state.audio}
					isPlay = {this.state.playing}
					pause = {this.pauseAudio}
					change = {this.changeTrack}
				/>
			</div>
		)
	}
}

export default App;