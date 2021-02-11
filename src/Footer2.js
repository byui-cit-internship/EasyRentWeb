import React from "react";
import { render } from "react-dom";
import "./App.css";
import logo1 from './Gray.png';

const Footer2 = () => (
  <footer className="footer2">
   
  </footer>
); 

const App = () => (
  <div className="content">
    
  </div>
);

render([<App key="1" />, <Footer2 key="2" />], document.getElementById("root"));

export default Footer2;
