import React, { Component } from 'react'
import './campaign-item.css';

class CompaignItem extends Component {
    constructor(props) {
        super(props);
        // this.state = {
            
        // }
    }
   
    render() {
        const { name, icon } = this.props;
        return (
            <div className="campaign-item">
                <div className="campaign-head">
                    <img className="campain-icon" src={icon} alt={name} />
                    <div className="campaign-name">{name}</div>
                </div> 
            </div>
        )
    }
}

export default CompaignItem;
