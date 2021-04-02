import React, { Component } from 'react';
import { MenuItems } from './Menuitems';
import { Button } from './Button';
import './Navbar.css';
import './Button.css';
import {BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => (
        this.setState({clicked: !this.state.clicked})
    )

    render(){
        return(
            <nav className="NavbarItems">
            <div className="menu-icon" onClick={this.handleClick}>
                <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>

            </div>
            <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) =>{
                    return(<li key={index}>
                        <a className={item.cName} href={item.url}>
                            {item.title}
                        </a>
                    </li>)
                })}
                
            </ul>
            <Button> <a href="../Createreservation/Createreservation.js"></a>Reserve Equipment</Button>
            </nav>
        )
    }
    
}

export default Navbar