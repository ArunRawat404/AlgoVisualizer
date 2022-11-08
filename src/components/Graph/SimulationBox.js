import React from 'react'
import './styles.css';

class SimulationBox extends React.Component {
    
    componentDidMount() {
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.timer);
    }

    resumeTimer(){
        if (this.state.src.row === -1 || this.state.dest.row === -1){
            return;
        }
        this.timer = setInterval(() => {
            let newTime = this.state.time;
            if (newTime[2] === 59){
                newTime[2] = 0;
                if (newTime[1] === 59){
                    newTime[1] = 0;
                    newTime[0] = (newTime[0] + 1) % 24;
                } else {
                    newTime[1] = (newTime[1] + 1) % 60;
                }
            } else {
                newTime[2] = (newTime[2] + 1) % 60;
            }
            this.setState({time : newTime});
        }, 1000);
    }

    // Method to be overridden
    doSomething(){
        // Override this function in the subclass

        return null;
    }
    
    restartSimulation = () => {
        clearInterval(this.interval);
        clearInterval(this.timer);
        let oldState = this.state;
        oldState.time = [0, 0, 0];
        oldState.resumeStatus = false;
        oldState.src = {row : -1, col : -1};
        oldState.dest = {row : -1, col : -1};
        oldState.graph = this.origGraph.slice();
        this.setState(oldState);
    }

    handleSpeedDecrease = () => {
        let oldState = this.state;
        if (oldState.refreshTime < 200 * 4){
            oldState.refreshTime *= 2;
            this.setState(oldState)
            if (this.state.resumeStatus){
                clearInterval(this.interval)
                this.startSimulation();
            }
        }
    }
    
    handleSpeedIncrease = () => {
        let oldState = this.state;
        if (oldState.refreshTime > 12){
            oldState.refreshTime /= 2;
            this.setState(oldState)
            if (this.state.resumeStatus){
                clearInterval(this.interval)
                this.startSimulation();
            }
        }
    }
    
    handleStartPause = () => {
        if (this.state.src.row === -1 || this.state.dest.row === -1){
            return;
        }
        if (this.state.resumeStatus){
            let oldState = this.state;
            oldState.resumeStatus = false;
            clearInterval(this.interval);
            clearInterval(this.timer)
            this.setState(oldState);
        } else {
            let oldState = this.state;
            oldState.resumeStatus = true;
            this.setState(oldState);
            this.startSimulation();
            this.resumeTimer();
        }
    }
    
    handleRestart = () => {
        clearInterval(this.interval);
        clearInterval(this.timer);
        let oldState = this.state;
        oldState.time = [0, 0, 0];
        oldState.resumeStatus = false;
        oldState.graph = this.origGraph;
        this.setState(oldState);
    }
}

export default SimulationBox;