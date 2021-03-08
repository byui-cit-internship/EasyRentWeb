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
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Grid from "@material-ui/core/Grid";
import { propTypes } from 'react-bootstrap/esm/Image';
import { TrainRounded } from '@material-ui/icons';

const EasyRentURL = "https://easyrent-api-dev.cit362.com/reservations";

const today = new Date();
today.setHours(0, 0, 0, 0);

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
  const [filter, setFilter] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  const [switchToggle, setSwitchToggle] = useState(false);

  const toggleChecked = () => {
    setSwitchToggle(!switchToggle);
  }
  const reservationList = React.createRef();

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
  console.log('switch', switchToggle) 
 
  return (
    
    <div className="App">
      
      <BarNav filter={filter} suggestions={suggestions} setFilter={setFilter} />
    
     <h1 className="TitleReservations1" variant="h1" Wrap>
        OUTDOOR RESOURCE CENTER
        </h1>
        <Grid alignItems="center" container>
          <Grid xs={3} sm={3} alignItems="center" item></Grid>
          <Grid xs={6} sm={6} alignItems="center" item>
      <h1 className="TitleReservations" variant="h1" Wrap>
        Returns by Due Date
        </h1>
        </Grid>
        <Grid xs={3} sm={3} alignItems="center" item>
      <div >
          <BootstrapSwitchButton 
          checked={switchToggle} 
          onChange={toggleChecked}
          width={110} 
          onlabel={'Outside'}
          offlabel={'Inside'}
          offstyle={'outline-secondary'}
          
        />
      </div>
      </Grid>
      </Grid>
      
      {!filter && <>
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
        </div>
      </>}
     
      <div >
        <ReservationList
          ref={reservationList}
          setSuggestions={setSuggestions}
          filter={filter}
          show={show}
          daySelected={daySelected}
          switchToggle={({
            true: 'returned',
            false: 'recorded'
          })[switchToggle]}
          toggleChecked={toggleChecked}
          />
      </div>

      <Footer />
    </div>
  )
  
  
}



export default App;
