import React from "react";
import "./App.css";
import logo1 from './Gray.png';


var style = {
  backgroundColor: "#252525",
  
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "50px",
  width: "100%",
  
}

var phantom = {
display: 'block',
padding: '20px',
height: '70px',
width: '100%',
}

function Footer({ children }) {
    return (
        <div>
           <div style={phantom} />
            <div style={style}>
            
                { children }
                <img className="BYUI-Gray-Logo" src={logo1} />
            </div>
        </div>
    )
}



export default Footer;

