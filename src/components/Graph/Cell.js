import React from 'react'
import './canvas-styles.css'

class Cell extends React.Component {
    componentDidMount(){
        this.isMouseDown = false;
        
        document.addEventListener('mousedown', () => {
            this.isMouseDown = true;
        })
        document.addEventListener('mouseup', () => {
            this.isMouseDown = false;
        })
    }

    render() { 

        const {cell, onToolUsed} = this.props;
        const {color} = cell;

        return <div onMouseOver={() => {
            if (this.isMouseDown) {
                onToolUsed(cell)}
                this.isMouseDown = false;
            }
        } className="cell" style={{backgroundColor : color}}> 
        
        </div>;

    }
}
 
export default Cell;