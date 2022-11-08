import React from 'react'
import './styles.css';
import './statusbar-styles.css';
import SpeedButton from './SpeedButton';
import PlayButton from './PlayButton';
import Dropdown from './Dropdown';
import ToolBox from './ToolBox';

class StatusBar extends React.Component {
    formatTime(){
        let sec = `${this.props.time[0]}`;
        if (sec.length === 1){
            sec = "0" + sec;
        }
        let min = `${this.props.time[1]}`;
        if (min.length === 1){
            min = "0" + min;
        }
        let hour = `${this.props.time[2]}`;
        if (hour.length === 1){
            hour = "0" + hour;
        }
        return `${sec}:${min}:${hour}`;
    }

    render() { 
        const {onSpeedDecreased, onSpeedIncreased, onPause, icon, speed, origSpeed, title, 
                onRestart, onAlgoChange, algos, onToolChange} = this.props;
        return <div className="status-bar">
            <PlayButton onPause={onPause} icon={icon}/>
            <p className="time-text">{this.formatTime()}</p>
            <div onClick={onRestart} className="restart-button" title="Restart">
                🔁
            </div>
            <ToolBox onToolChange={(toolName) => onToolChange(toolName)} />
            <Dropdown title={title} onAlgoChange={(algoTitle) => onAlgoChange(algoTitle)} algos={algos}/>
            <SpeedButton speed={speed} origSpeed={origSpeed} 
                         onSpeedDecreased={onSpeedDecreased} 
                         onSpeedIncreased={onSpeedIncreased}/>
            {/* <div className="custom-input" style={}>
                
            </div> */}
        </div>;
    }
}
 
export default StatusBar;