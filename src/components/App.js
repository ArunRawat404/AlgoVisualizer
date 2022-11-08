import React from 'react'
import BubbleSortApp from './Sorting/BubbleSortApp';
import InsertionSortApp from './Sorting/InsertionSortApp';
import SelectionSortApp from './Sorting/SelectionSortApp';
import Dijkstras from './Graph/DijkstrasSimulatorApp';

class App extends React.Component {
    state = {
        algo : "Bubble Sort"
    }

    constructor(){
        super();
        this.algos = ["Bubble Sort", "Insertion Sort", "Selection Sort", "Dijkstras"];
    }

    handleAlgoChange = (newAlgo) => {
        let oldState = this.state;        
        oldState.algo = newAlgo;
        this.setState(oldState);
    }

    render() { 
        let TempApp = null;
        if (this.state.algo === "Bubble Sort") {
            TempApp = BubbleSortApp
        } else if (this.state.algo === "Insertion Sort") {
            TempApp = InsertionSortApp
        } else if (this.state.algo === "Selection Sort"){
            TempApp = SelectionSortApp
        } else if (this.state.algo === "Dijkstras"){
            TempApp = Dijkstras
        }
        return <TempApp onAlgoChange={(algoTitle) => this.handleAlgoChange(algoTitle)} algos={this.algos} />
    }
}
 
export default App;