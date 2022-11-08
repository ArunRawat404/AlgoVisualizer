import React from 'react'
import './styles.css';
import SortingSimulationBox from './SortingSimulationBox';

class BubbleSortApp extends SortingSimulationBox {
    state = {
        resumeStatus : false,
        time : [0, 0, 0],
        outerLoop : 0,
        innerLoop : 0,
        refreshTime : 200,
        origSpeed : 200,
        title : "Bubble Sort",
        customInput : false,
        arr : [
            {height: 250, color : "cyan"},
            {height: 160, color : "cyan"},
            {height: 200, color : "cyan"},
            {height: 90, color : "cyan"},
            {height: 350, color : "cyan"},
            {height: 250, color : "cyan"},
            {height: 80, color : "cyan"},
            {height: 210, color : "cyan"},
            {height: 280, color : "cyan"},
            {height: 90, color : "cyan"},
            {height: 350, color : "cyan"},
            {height: 250, color : "cyan"},
            {height: 240, color : "cyan"},
            {height: 280, color : "cyan"},
            {height: 250, color : "cyan"},
            {height: 240, color : "cyan"},
            {height: 280, color : "cyan"},
            {height: 90, color : "cyan"},
            {height: 350, color : "cyan"},
            {height: 250, color : "cyan"},
            {height: 280, color : "cyan"},
        ]
    }
    
    constructor(){
        super();
    }

    // Overridden method of super class
    doSomething(){
        let i = this.state.outerLoop;
        let j = this.state.innerLoop;
        let arr = this.state.arr.slice(0, this.state.arr.length);
        arr = arr.map(a => {
            return {height : a.height, color : a.color !== this.colors.barDone? this.colors.barOrig : this.colors.barDone};
        })
        
        if (i === arr.length - 1){
            arr[0].color = this.colors.barDone;
            this.handleStartPause();
        }
        
        if (arr[j].height > arr[j + 1].height){
            let temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
            arr[j].color = this.colors.barSwap;
        }
        if (arr[j+1].color !== this.colors.barDone){
            arr[j+1].color = this.colors.barCurr;
        }
        j++;
        if (j === arr.length - i - 1){
            arr[j].color = this.colors.barDone;
            j = 0;
            i++;
        }
        return [arr, i, j];
    }
}

export default BubbleSortApp;