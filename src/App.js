import { Title } from '@material-ui/icons';
import './App.css';
import BarNav from './BarNav.js';
import App1 from './App.css';
import React, { useState, TouchableOpacity, useEffect } from 'react';
import { render } from '@testing-library/react';
import FlatList from 'flatlist-react';
import { View } from 'react-view';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Text from 'react-text';
import ReservationList from './ReservationList';
import Button from '@material-ui/core/Button';
import Select from 'react-select';

import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownItem from 'react-bootstrap/DropdownItem';

import ModalFooter from 'react-bootstrap/ModalFooter';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Footer2 from './Footer2';

const EasyRentURL = "https://easyrent-api-dev.cit362.com/reservations";

const today = new Date();
today.setHours(0,0,0,0);

const pastDue = new Date(today);
const future = new Date(today);

pastDue.setDate(today.getDate() - 1);
future.setDate(today.getDate() + 1);

function App() {

  const [startDate, setStartDate] = useState(new Date());
  const [dropdownSelected, setDropDownSelected] = useState('Today');
  const [daySelected, setDaySelected] = useState(today);
  const [DropdownButtonDate, setDropdownButtonDate] = useState({});
  const [show, setShow] = useState('today');
  // setDropdownButtonDate = handleChange;

  function handleChange(e) {
    console.log("The title is =====", e)
    setDropDownSelected(e);
    switch (e) {
      case "Today":
        setDaySelected(today);
        console.log("The title Today =====", today)
        setShow('today')
        break;
      case "Past Due":
        setDaySelected(pastDue);
        console.log("The title PastDue =====", pastDue)
        setShow('past')
        break;
      case "Future":
        setDaySelected(future);
        console.log("The title Future =====", future)
        setShow('future')
        break;
    }
  };

  return (
    <div className="App">
      <BarNav />
      <h1 className="TitleReservations" variant="h1" Wrap>
        Due Date Returns
        </h1>

      {/* <div class="col-md-20">
          <Dropdown className="Dropdown" options={options} value={'Today'} 
          variant="secondary btn-sm"/> 
        </div> */}

      <div className="Dropdown">
        <DropdownButton title={dropdownSelected} onSelect={handleChange}>
          <DropdownItem eventKey="Past Due">Past Due</DropdownItem>
          <DropdownItem eventKey="Today">Today</DropdownItem>
          <DropdownItem eventKey="Future">Future</DropdownItem>
        </DropdownButton>
      </div>

      <div className="DPk">
        <DatePicker className="datePicker"
          selected={daySelected.valueOf() !== today.valueOf()
            ? daySelected
            : daySelected
          }
          onChange={date => setDaySelected(date)}

          popperPlacement="bottom"
          dateFormat="MMMM d, yyyy"
        />
        {/* <img src={Calendar} className="Calendar" alt="calendar" /> */}
      </div>

      <div >
        <ReservationList show={show} daySelected={daySelected} />
        
      </div>
     
      <Footer />
    </div>
  )
}


export default App;
