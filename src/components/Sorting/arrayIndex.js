import React from 'react'
import './canvas-styles.css'

class Index extends React.Component {
    render() { 
        const {value, color} = this.props.properties;
        const styles = {
            borderColor : color,
            color : color
        }
        return <div style={styles} className="index">
            {value}
        </div>;
    }
}
 
export default Index;