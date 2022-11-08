import React from 'react'
import './textbox-styles.css'

class TextBox extends React.Component {
    render() { 
        if (this.props.customInput){
            return <div className="textbox-container">
                <input className="textbox" onChange={this.props.onInputChange}>
                </input>
                <button onClick={this.props.onCustomInput} className="textbox-button">
                    Enter
                </button>
            </div>
        } 
        return null;
    }
}
 
export default TextBox;