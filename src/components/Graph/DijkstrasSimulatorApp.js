import React from 'react'
import SimulationBox from './SimulationBox'
import Canvas from './Canvas'
import StatusBar from './Statusbar'

class DijkstrasSimulatorApp extends SimulationBox {

    constructor(){
        super();

        let rows = 25;
        let cols = rows * 2;
        let graph = [];
        this.rows = rows;
        this.cols = cols;
        this.visited = 0;

        for (let i = 0; i < rows; i++) {
            let row = []
            for (let j = 0; j < cols; j++){
                row.push({row : i, col : j, color : 'white'});
            }
            graph.push(row);
        }

        this.colors = {
            cellOrig : 'white',
            cellSrc : 'blue',
            cellDest : 'red',
            cellObs : 'black',
            cellDone : 'cyan',
            cellCurr : 'yellow',
            cellAns : 'green',
        }
        this.parent = []
        this.childRow = -1;
        this.childCol = -1;

        this.origGraph = graph.slice();

        let origSpeed = 300;
        this.state = {
            resumeStatus : false,
            time : [0, 0, 0],
            refreshTime : origSpeed,
            origSpeed : origSpeed,
            title : "Dijkstras",
            differentInput : false,
            currentTool : '⚫',
            graph: graph,
            src : {row : -1, col : -1},
            dest : {row : -1, col : -1},
            pathFound : false
        }
    }

    startSimulation(){
        if (this.state.src.row === -1 || this.state.dest.row === -1){
            this.handleRestart();
            return;
        }
        this.interval = setInterval(() => {
            if (this.state.pathFound) {
                let res = this.processFoundPath();
                let graph = res[0];
                if (this.childRow === this.state.src.row && this.childCol === this.state.src.col){
                    graph[this.childRow][this.childCol].color = this.colors.cellSrc;
                    this.handleStartPause();
                }
                let oldState = this.state;
                oldState.graph = graph;
                this.setState(oldState);
            } else {
                let res = this.findPath();
                let graph = res[0];
                let oldState = this.state;
                oldState.graph = graph;
                this.setState(oldState);
            }
        }, this.state.refreshTime);
    }

    validCell(row, col){
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols){
            if (this.state.graph[row][col].color !== this.colors.cellObs && 
                this.state.graph[row][col].color !== this.colors.cellSrc){
                return true;
            }
        }
        return false;
    }

    processFoundPath = () => {
        let graph = this.state.graph.slice();
        if (this.childRow === -1){
            this.childRow = this.state.dest.row;
            this.childCol = this.state.dest.col;
        }
        let parentRow = -1;
        let parentCol = -1;
        for (let i = 0; i < this.parent.length; i++) {
            let item = this.parent[i];
            if (this.childRow === item.childRow && this.childCol === item.childCol){
                parentRow = item.parentRow;                
                parentCol = item.parentCol;
                break;
            }
        }
        graph[parentRow][parentCol].color = this.colors.cellAns;
        this.childRow = parentRow;
        this.childCol = parentCol;
        return [graph];
    }
    

    findPath = () => {
        let graph = this.state.graph.slice();
        let changes = [];

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.state.graph[row][col].color === this.colors.cellSrc){
                    let nbrs = [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]]
                    nbrs.forEach(item => {
                        let r = item[0]
                        let c = item[1]
                        if (this.validCell(r, c)){
                            if (this.state.graph[r][c].color === this.colors.cellOrig){
                                changes.push({row: r, col: c, color : this.colors.cellCurr});
                                this.parent.push({parentRow : row, parentCol : col, childRow : r, childCol : c})
                            }
                        }
                    })
                }
                if (this.state.graph[row][col].color === this.colors.cellCurr){
                    changes.push({row: row, col: col, color : this.colors.cellDone});
                    
                    let nbrs = [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]]
                    nbrs.forEach(item => {
                        let r = item[0]
                        let c = item[1]
                        if (this.validCell(r, c)){
                            if (this.state.graph[r][c].color === this.colors.cellDest){
                                this.parent.push({parentRow : row, parentCol : col, childRow : r, childCol : c})
                                let oldState = this.state;
                                oldState.pathFound = true;
                                this.setState(oldState);
                                return [graph, true];
                            }
                            if (this.state.graph[r][c].color === this.colors.cellOrig){
                                changes.push({row : r, col : c, color : this.colors.cellCurr});
                                this.parent.push({parentRow : row, parentCol : col, childRow : r, childCol : c})
                            }
                        }
                    })
                }
            }
        }

        changes.forEach(c => {
            graph[c.row][c.col].color = c.color;
        })
        
        return [graph, false];
    }

    handleAddObstacles = (cell) => {
        let oldState = this.state;
        oldState.graph[cell.row][cell.col].color = this.colors.cellObs;
        this.setState(oldState);
    }
    
    handleRemoveObstacles = (cell) => {
        let oldState = this.state;
        oldState.graph[cell.row][cell.col].color = this.colors.cellOrig;
        this.setState(oldState);
    }

    handleAddSource = (cell) => {
        let oldState = this.state;
        if (oldState.src.row === -1){
            oldState.graph[cell.row][cell.col].color = this.colors.cellSrc;
        } else {
            oldState.graph[oldState.src.row][oldState.src.col].color = this.colors.cellOrig;
            oldState.graph[cell.row][cell.col].color = this.colors.cellSrc;
        }
        oldState.src.row = cell.row;
        oldState.src.col = cell.col;
        this.setState(oldState);
    }
    
    handleAddDestination = (cell) => {
        let oldState = this.state;
        if (oldState.dest.row === -1){
            oldState.graph[cell.row][cell.col].color = this.colors.cellDest;
        } else {
            oldState.graph[oldState.dest.row][oldState.dest.col].color = this.colors.cellOrig;
            oldState.graph[cell.row][cell.col].color = this.colors.cellDest;
        }
        oldState.dest.row = cell.row;
        oldState.dest.col = cell.col;
        this.setState(oldState);
    }

    handleToolChange = (toolName) => {
        let oldState = this.state;
        oldState.currentTool = toolName;
        this.setState(oldState);
    }

    handleToolUsed = (cell) => {
        if (this.state.resumeStatus === true){
            return;
        }
        let currTool = this.state.currentTool;
        if (currTool === '⚫'){
            this.handleAddObstacles(cell);
        } else if (currTool === ' ⚪'){
            this.handleRemoveObstacles(cell);
        } else if (currTool === '🔴'){
            this.handleAddDestination(cell);
        } else if (currTool === '🔵') {
            this.handleAddSource(cell);
        }
    }

    render() { 
        return <div>
            <div className="game-box">
                <StatusBar speed={this.state.refreshTime}
                           onPause={this.handleStartPause}
                           time={this.state.time}
                           icon={this.state.resumeStatus? '🟢':'⬜'}
                           onRestart={this.handleRestart}
                           onToolChange={this.handleToolChange}
                           title={this.state.title}
                           algos={this.props.algos}
                           onAlgoChange={(algoTitle) => this.props.onAlgoChange(algoTitle)}
                           origSpeed={this.state.origSpeed}
                           onSpeedIncreased={this.handleSpeedIncrease} 
                           onSpeedDecreased={this.handleSpeedDecrease} />
                <Canvas onToolUsed={(cell) => this.handleToolUsed(cell)} graph={this.state.graph} />
            </div>
        </div>
    }

}
 
export default DijkstrasSimulatorApp;