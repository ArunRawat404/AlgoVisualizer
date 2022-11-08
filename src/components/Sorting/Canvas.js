import React from 'react'
import './styles.css';
import './canvas-styles.css';
import Bar from './bar';
import Index from './arrayIndex';

class Canvas extends React.Component {
    
    render() { 
        document.addEventListener('contextmenu', e => e.preventDefault()); // Disabling the right click 

        let arr = this.props.array;
        let mx = arr[0].height;
        let mn = arr[0].height;
        const canvasHeight = 350;
        const offset = 1;
        arr.forEach((item) => {
            if (mx < item.height) mx = item.height;
            if (mn > item.height) mn = item.height;
        })

        arr = arr.map((item) => {
            return {height: offset + Math.floor((item.height / mx) * canvasHeight), color : item.color};
        })
    
        let ind = arr.map((a, i) => {
            return {value : i, color: a.color}
        });
        
        return <div className="canvas" id="myCanvas">
            <div className="outer-container">
                <div className="bars-container">
                    {arr.map((p, i) => {
                        return <Bar key={i} properties={p}/>
                    })}
                </div>
                <hr className="line"/>
                <div className="indices-container">
                    {ind.map((p, i) => {
                        return <Index key={i} properties={p}/>
                    })}
                </div>
            </div>
        </div>;
    }
}
 
export default Canvas;