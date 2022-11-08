import React from 'react'
import './styles.css';
import SortingSimulationBox from './SortingSimulationBox';

class SelectionSortApp extends SortingSimulationBox {
    state = {
        resumeStatus : false,
        time : [0, 0, 0],
        outerLoop : 0,
        innerLoop : 0,
        refreshTime : 200,
        origSpeed : 200,
        title : "Selection Sort",
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
            return {height : a.height, color : a.color === this.colors.barCurr? this.colors.barOrig : a.color};
        })

        arr[j].color = this.colors.barCurr;
        j++;
        
        // Terminating condition
        if (i === arr.length - 1){
            this.handleStartPause();
        }
        
        if (j === arr.length){
            let mn = arr[i];
            let mnIdx = i;
            for (let k = i; k < arr.length; k ++){
                    if (mn.height > arr[k].height){
                        mn = arr[k];
                        mnIdx = k;
                    }
                }
            let temp = arr[mnIdx];
            arr[mnIdx] = arr[i];
            arr[i] = temp;
            
            arr[i].color = this.colors.barDone;
            i++;
            j = i;
        }

        return [arr, i, j];
    }
}

export default SelectionSortApp;