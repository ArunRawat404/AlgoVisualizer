import React from 'react'

class PlayButton extends React.Component {
    render() { 
        return <div onClick={this.props.onPause} className="play-pause-button" title={this.props.icon === '🟢' ? 'Pause' : 'Start'}>
            {this.props.icon === '🟢' ? '⬜': '🟢'}
        </div>;
    }
}
 
export default PlayButton;