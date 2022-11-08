import React from 'react'
import './styles.css';
import './canvas-styles.css';
import Cell from './Cell';

class Canvas extends React.Component {
    
    render() { 
        let {graph, onToolUsed} = this.props;
        document.addEventListener('contextmenu', e => e.preventDefault()); // Disabling the right click 



        return <div className="canvas" id="myCanvas">
            {graph.map((row, i) => {
                return (<div className="row" key={i}>
                    {row.map((item) => {    
                            return <Cell onToolUsed={(cell) => onToolUsed(cell)} cell={item} key={item.col}/>
                        })}
                </div>)
            })}
        </div>;
    }
}
 
export default Canvas;