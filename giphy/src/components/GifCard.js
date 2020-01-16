import React, { Component } from 'react';
import './GifCard.css'

class GifCard extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <img src={this.props.url}/>
        );
    }
}

export default GifCard;