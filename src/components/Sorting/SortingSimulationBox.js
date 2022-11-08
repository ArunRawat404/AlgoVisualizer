import React from 'react'
import './styles.css';
import StatusBar from './Statusbar';
import Canvas from './Canvas';
import TextBox from './TextBox';

class SortingSimulationBox extends React.Component {
    state = {
        resumeStatus : false,
        time : [0, 0, 0],
        refreshTime : 200,
        origSpeed : 200,
        title : "Simulation Box",
        customInput : false,
    }
    
    constructor(){
        super();
        this.colors = {
            barOrig : 'cyan',
            barDone : 'green',
            barCurr : 'white',
            barSwap : 'yellow',
        }
        this.origArr = [
            {height: 250, color : this.colors.barOrig},
            {height: 160, color : this.colors.barOrig},
            {height: 200, color : this.colors.barOrig},
            {height: 90, color : this.colors.barOrig},
            {height: 350, color : this.colors.barOrig},
            {height: 250, color : this.colors.barOrig},
            {height: 80, color : this.colors.barOrig},
            {height: 210, color : this.colors.barOrig},
            {height: 280, color : this.colors.barOrig},
            {height: 90, color : this.colors.barOrig},
            {height: 350, color : this.colors.barOrig},
            {height: 250, color : this.colors.barOrig},
            {height: 240, color : this.colors.barOrig},
            {height: 280, color : this.colors.barOrig},
            {height: 250, color : this.colors.barOrig},
            {height: 240, color : this.colors.barOrig},
            {height: 280, color : this.colors.barOrig},
            {height: 90, color : this.colors.barOrig},
            {height: 350, color : this.colors.barOrig},
            {height: 250, color : this.colors.barOrig},
            {height: 280, color : this.colors.barOrig},
        ]
    }
    
    componentDidMount() {
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    resumeTimer(){
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
        oldState.innerLoop = 0;
        oldState.outerLoop = 0;
        oldState.time = [0, 0, 0];
        oldState.resumeStatus = false;
        this.setState(oldState);
    }

    startSimulation(){
        this.interval = setInterval(() => {
            let [newArr, i, j] = this.doSomething();
            let oldState = this.state;
            oldState.arr = newArr;
            oldState.outerLoop = i;
            oldState.innerLoop = j;
            this.setState(oldState);
        }, this.state.refreshTime);
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
        oldState.innerLoop = 0;
        oldState.outerLoop = 0;
        oldState.time = [0, 0, 0];
        oldState.resumeStatus = false;
        oldState.arr = this.origArr;
        oldState.customInput = false;
        this.setState(oldState);
    }

    handleCustomInput = () => {
        let oldState = this.state;
        oldState.customInput = ! oldState.customInput;
        this.setState(oldState);
    }

    handleInputChange = (e) => {
        let inp = e.target.value;
        if (inp === '' || isNaN(inp.replace(" ", "")[0])){
            let oldState = this.state;
            oldState.arr = this.origArr;
            this.setState(oldState);
            this.restartSimulation();
            return;
        } 
        
        let newArr = inp.replace(" ", "").split(",").map(s => {
            if (isNaN(s)) return -1;
            return {height : parseInt(s), color : this.colors.barOrig}
        });

        newArr = newArr.filter(a => a !== -1);

        let oldState = this.state;
        oldState.arr = newArr;
        this.setState(oldState);
        this.restartSimulation();
    }

    render() { 
        return <div>
            <div className="game-box">
                <StatusBar speed={this.state.refreshTime}
                           onPause={this.handleStartPause}
                           time={this.state.time}
                           icon={this.state.resumeStatus? '🟢':'⬜'}
                           onRestart={this.handleRestart}
                           title={this.state.title}
                           algos={this.props.algos}
                           onAlgoChange={(algoTitle) => this.props.onAlgoChange(algoTitle)}
                           origSpeed={this.state.origSpeed}
                           onSpeedIncreased={this.handleSpeedIncrease} 
                           onSpeedDecreased={this.handleSpeedDecrease} 
                           onCustomInput={this.handleCustomInput} />
                <Canvas array={this.state.arr}/>
                <TextBox customInput={this.state.customInput} 
                           arr={this.state.arr}
                           onInputChange={this.handleInputChange} 
                           onCustomInput={this.handleCustomInput}  />
            </div>
        </div>
    }
}

export default SortingSimulationBox;