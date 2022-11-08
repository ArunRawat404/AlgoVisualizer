import React from 'react'
import './canvas-styles.css'

class Bar extends React.Component {
    render() { 
        const {height, width, color} = this.props.properties;
        const styles = {
            backgroundColor : color,
            height : height,
            width : width,
        }
        return <div className="bar" style={styles}>
        </div>
    }
}
 
export default Bar;