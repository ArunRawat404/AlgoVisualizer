import React from 'react'
import './statusbar-styles.css'

class SpeedButton extends React.Component {
    formattedSpeed(){
        let speed = this.props.origSpeed/this.props.speed;
        if (speed < 0.25) speed = 0.25;
        speed = String(speed);
        return speed;
    }

    render() { 
        const {onSpeedDecreased, onSpeedIncreased} = this.props;
        return <div className="speed-buttons">
            <div onClick={onSpeedDecreased} className="reduce-speed" title="Decrease Speed">&lt;&lt;</div>
            <div className="speed-text">{this.formattedSpeed()}x</div>
            <div onClick={onSpeedIncreased} className="increase-speed" title="Increase Speed">&gt;&gt;</div>
        </div>;
    }
}
 
export default SpeedButton;