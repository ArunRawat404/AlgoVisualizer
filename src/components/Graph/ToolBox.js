import React from 'react'
import './toolbox.css'

class ToolBox extends React.Component {
    render() { 
        const {onToolChange} = this.props;
        let toolNames = ["⚫ + Obstacles", "⚪ - Obstacles", "🔵 Source", "🔴 Dest"]
        let toolVals = ["⚫", " ⚪", "🔵", "🔴"];
        let maxTitle = toolNames[0];
        toolNames.forEach(item => {
            if (maxTitle.length < item.length) maxTitle = item;
        })

        return <div className="tools-container">
                    <div className="tools">
                        Tools
                        <div className="dropdown-content" style={{width : 5 + maxTitle.length * 10}}>
                            {toolNames.map((item, i) => {
                                return <li onClick={() => onToolChange(toolVals[i])} key={i} className="dropdown-item">{item}</li>
                            })}
                        </div>    
                    </div>
                </div>;
    }
}
 
export default ToolBox;