import React, {Component} from 'react';
import volume_icon from './assets/volume-off.svg';
import next_icon from './assets/next_btn.png';
import prev_icon from './assets/previous_btn.png';
import play_icon from './assets/play_btn.png';
import pause_icon from './assets/pause_btn.png';

class Menu extends Component {
	constructor(props){
		super(props)
		this.state = {
			volume: 1,
			dragging: false
		}
	}

	changeProgress = (val) => {
		if(this.props.audio){
			this.props.audio.currentTime = (this.props.audio.duration * val);
		}
	}

	changeVolume  = (val) => {
		if(this.props.audio)
		this.props.audio.volume = val;
	}

	stopUpdate = (bool) => {
		bool? this.setState({dragging: false}) : this.setState({dragging: true});
	}

	progress = (num) => {
 		if(!this.state.dragging){
			this.refs.bar.value = num;
		}
	}

	updateProgress() {
		if(this.refs.bar && this.refs){
			if(this.props.audio){
				this.props.audio.addEventListener("timeupdate", (evn) => {
					let audio = evn.path[0];
					this.progress((audio.currentTime/audio.duration)*100);
				})
				this.props.audio.addEventListener("ended", (evn) => {
					this.props.pause(true);
				})
			}else {				
				this.progress(0);
			}
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(nextState.dragging !== this.state.dragging || nextState.volume !== this.state.volume){
			return false;
		}
		return true;
	}

	render() {
		this.updateProgress();
		let track = null;
		let track_img = '';
		let track_name = '';
		let track_artist = '';
		if(this.props.playingTrack){
			track = this.props.playingTrack;
			track_img = track.album.images[0].url;
			track_name = track.name;
			track_artist = track.artists[0].name;
			this.changeVolume(this.state.volume);
		}
		return (
			<div className={`menu ${(track)?"":"hidden"}`}>
				<div className="range_clipper">
					<input ref="bar" type="range" min="0" max="100" className="progress_bar" onChange={ev => this.changeProgress(ev.target.value/100)} 
					onMouseUp={()=>this.stopUpdate(true)} 
					onMouseDown={()=>this.stopUpdate(false)}/>
				</div>
				<div className="display">
					<div className="info">
						<img src={track_img} alt="track image"/>
						<div className="track_text">
							<div className="title">{track_name}</div>
							<div className="dash">-</div>
							<div className="artist">{track_artist}</div>
						</div>
					</div>
					<div className="controls">
						<div className="prev" onClick={()=>{this.props.change(true)}} ><img src={prev_icon} alt="prev icon"/></div>
						{
							(this.props.isPlay)
							?<div className="play" onClick={()=>this.props.pause(false)} ><img src={pause_icon} alt="pause icon"/></div>
							:<div className="play" onClick={()=>this.props.pause(false)} ><img src={play_icon} alt="play icon"/></div>
						}
						<div className="next" onClick={()=>{this.props.change(false)}} ><img src={next_icon} alt="next icon"/></div>
					</div>
					<div className="volume">
						<img className="volume_icon" src={volume_icon} alt="volume icon"/>
						<div className="range_clipper">
							<input type="range" min="0" max="100" defaultValue="100" onChange={ev => {
								const vol = ev.target.value/100
								this.changeVolume(vol);
								this.setState({volume: vol}) 
							}}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Menu;