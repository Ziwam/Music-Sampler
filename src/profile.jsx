import React, {Component} from 'react';

class Profile extends Component {
	render() {
		let artist = {name: '', followers: {total: ''}, images: [{url: ''}],genres: []};
		if(this.props.artist !== null){
			artist = this.props.artist;
		}
		artist = this.props.artist !== null ? this.props.artist: artist;

		const divStyle = {
			backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url(${artist.images[0].url})`,
			backgroundSize: `cover`
		}

		return (
			<div className= "profile">
				<div className="background"  style={divStyle}></div>
			 	<img
					alt="Profile"
					className="profile_picture"
					src = {artist.images[0].url}
			 	/>
			 	<div className="info">
					<div className="name">{artist.name}</div>
					<div className="followers">{artist.followers.total} followers</div>
					<div className="genres">
						{
							artist.genres.map((genre,k) => {
								genre = genre !== artist.genres[artist.genres.length-1] ? ` ${genre},`:` & ${genre}`
								return <span key ={k}>{genre}</span>
							})
						}
					</div>
			 	</div>
			</div>
		);
	}
}

export default Profile;