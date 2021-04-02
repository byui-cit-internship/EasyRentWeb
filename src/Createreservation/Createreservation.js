import { PagesSharp } from '@material-ui/icons';
import React, { Component } from 'react';

class Createreservation extends Component {
    state = { clicked: false }

    handleClick = () => (
        this.setState({clicked: !this.state.clicked})
    )

    render(){
    }
}

export default Createreservation