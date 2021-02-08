import React from 'react';
import App from './App.css';
import Button from '@material-ui/core/Button';
import { FormatColorFill } from '@material-ui/icons';

function Reservations(props) {
    return (
        <div className="Reservations">
            <h3> Customer:{''}<br />{props.name}</h3> 
            <p> Due Date:{''} <br />{props.dueDate}</p>
            <h3> Items:{''} <br />{props.items}</h3> 
            <div className="Button">
                    <Button style={{ FormatColorFill:"#006EB6"}} variant="contained" >
                        Check Reservations Items
                        
                    </Button>
                </div> 
        </div>
        
    );
}

export default Reservations;