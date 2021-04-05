import './App.css';
import BarNav from './BarNav.js';
import React, { useState, TouchableOpacity, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-dropdown/style.css';
import ReservationList from './ReservationList';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Footer from './Footer';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Grid from "@material-ui/core/Grid";
import Context from './services/context';
import Navbar from './Navbar/Navbar';
import Createreservation from './Createreservation/Createreservation';
import Returns from './Returns/Returns';
import HomePage from './HomePage/HomePage'
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

const today = new Date();
today.setHours(0, 0, 0, 0);
const pastDue = new Date(today);
const future = new Date(today);
pastDue.setDate(today.getDate() - 1);
future.setDate(today.getDate() + 1);
const midnightToday = new Date();
midnightToday.setHours(0, 0, 0, 0);
const midnightYesterday = new Date();
midnightYesterday.setDate(midnightToday.getDate() - 1);
midnightYesterday.setHours(0, 0, 0, 0);
const midnightTomorrow = new Date();
midnightTomorrow.setDate(midnightTomorrow.getDate() + 1);
midnightTomorrow.setHours(0, 0, 0, 0);

function App(props) {

  const [startDate, setStartDate] = useState(new Date());
  const [dropdownSelected, setDropDownSelected] = useState('Today');
  const [daySelected, setDaySelected] = useState(today);
  const [DropdownButtonDate, setDropdownButtonDate] = useState({});
  const [show, setShow] = useState('today');
  const [filter, setFilter] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [switchToggle, setSwitchToggle] = useState(true);

  const toggleChecked = () => {
    setSwitchToggle(!switchToggle);
  }

  function handleChange(e) {
    console.log("The title is =====", e);
    setDropDownSelected(e);
    switch (e) {
      case "Today":
        setDaySelected(today);
        console.log("The title Today =====", today);
        setShow('today');
        break;
      case "Past Due":
        setDaySelected(pastDue);
        console.log("The title PastDue =====", pastDue);
        setShow('past');
        break;
      case "Future":
        setDaySelected(future);
        console.log("The title Future =====", future);
        setShow('future');
        break;
    }
  };

  const toggle = ({
    true: 'returned',
    false: 'recorded'
  })[switchToggle];

  // const togle = switchToggle ? 'returned' : 'recorded';
  const context = {
    toggle,
    suggestions,
    filter,
    setFilter
  };

  return (
    <Context.Provider value={context}>
      <div className="App">
        
        <BarNav />

        <h1 
          className={toggle === 'recorded' ? "TitleReservations1" : "TitleReservations2"} 
          variant="h1" Wrap
        >
          OUTDOOR RESOURCE CENTER
        </h1>
        <Router>
        <Navbar />
          <Switch>
            <Redirect exact from="/" to="HomePage"/>
          <Route path='/HomePage'>
              <HomePage />
            </Route>
            <Route path='/Createreservation'>
              <Createreservation />
            </Route>
            <Route path='/Returns'>
              <Returns />
            </Route>
          </Switch>   
        </Router>

                 
                </div>
        <Footer />
        
    </Context.Provider>
  )
}

export default App;
