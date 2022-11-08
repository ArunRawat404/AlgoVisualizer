import React from 'react'

class Dropdown extends React.Component {
    render() { 
        const {onAlgoChange, algos, title} = this.props;

        let maxTitle = algos[0];
        algos.forEach(item => {
            if (item.length > maxTitle.length) maxTitle = item;
        });

        return <div className="title-container">
                    <div className="title" id="algo-title" style={{width : title.length * 10}}>
                        {title}
                        <div className="dropdown-content" style={{width : maxTitle.length * 10}}>
                            {algos.map((item, i) => {
                                return <li onClick={() => onAlgoChange(item)} key={i} className="dropdown-item">{item}</li>
                            })}
                        </div>    
                    </div>
                </div>;
    }
}
 
export default Dropdown;