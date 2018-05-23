import React, {Component} from 'react';
import play_icon from './assets/play-icon.svg';
import pause_icon from './assets/pause-icon.svg';

class Gallery extends Component {

	playingOverlay(index, url) {
		if(this.props.playIndex === index && this.props.trackURL === url){
			return this.props.isPlay
			? (	
				<div className="overlay action" onClick={()=>this.props.pause(false)}>
					<img src={pause_icon} alt="pause icon"/>
				</div>
			)
			: (	
				<div className="overlay action" onClick={()=>this.props.pause(false)}>
					<img src={play_icon} alt="play icon"/>
				</div>
			)
		}else {
			return (
				<div className="overlay" onClick={()=> this.props.playTrack(index,false)}>
				</div>
			)
		}
	}

	render() {
		const {tracks} = this.props;
		return (
			<div className="wrapper">
			<div className="gallery">
				{tracks.map((track,index) => {
					const trackImg = track.album.images[0].url;
					return (
						<div 
							key = {index} 
							className="track"
						>
							{this.playingOverlay(index,track.preview_url)}
							<img src={trackImg} alt="track"/>
							<div className="text">
								{track.name}
							</div>
						</div>
					)
				})}
			</div>
			</div>
		);
	}
}

export default Gallery;