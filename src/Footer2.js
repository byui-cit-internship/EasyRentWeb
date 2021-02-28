import React from "react";
import "./App.css";
import logo1 from './Gray.png';


var style = {
  backgroundColor: "#EBEBEB",
  
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "100px",
  width: "100%",
  marginTop: "90px"
}

var phantom = {
display: 'block',
padding: '20px',
height: '60px',
width: '100%',
}

function Footer2({ children }) {
    return (
        <div>
           <div style={phantom} />
            <div style={style}>
                { children }
                
            </div>
        </div>
    )
}



export default Footer2;

