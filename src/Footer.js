import React from "react";
import { render } from "react-dom";
import "./App.css";
import logo1 from './Gray.png';

const Footer = () => (
  <footer className="footer">
    <img className="BYUI-Gray-Logo" src={logo1} />
  </footer>
);

const App = () => (
  <div className="content">
  
  </div>
);

render([<App key="1" />, <Footer key="2" />], document.getElementById("root"));

export default Footer;
