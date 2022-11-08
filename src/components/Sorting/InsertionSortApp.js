import React from 'react'
import './styles.css';
import SortingSimulationBox from './SortingSimulationBox';

class InsertionSortApp extends SortingSimulationBox {
    state = {
        resumeStatus : false,
        time : [0, 0, 0],
        outerLoop : 0,
        innerLoop : 0,
        refreshTime : 200,
        origSpeed : 200,
        title : "Insertion Sort",
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

        if (i === arr.length+1){
            this.handleStartPause();
        }

        arr[j].color = this.colors.barCurr;
        
        if (j == 0 || arr[j - 1].height <= arr[j].height){
            arr[j].color = this.colors.barDone;
            i++;
            j = i;
        } else {
            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
        }
        j--;
        
        return [arr, i, j];
    }

}

export default InsertionSortApp;