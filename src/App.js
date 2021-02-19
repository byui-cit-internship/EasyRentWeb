import { Title } from '@material-ui/icons';
import './App.css';
import BarNav from './BarNav.js';
import App1 from './App.css';
import React, {useState, TouchableOpacity, useEffect} from 'react';
import { render } from '@testing-library/react';
import FlatList from 'flatlist-react';
import { View } from 'react-view';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from './Calendar.png';
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

function App() {

  const [startDate, setStartDate] = useState(new Date());    
  const today = new Date()
  const yesterday = new Date(today)
  const tomorrow = new Date(today)

  yesterday.setDate(today.getDate() - 1)
  tomorrow.setDate(today.getDate() + 1)

  function handleChange(e){

    console.log("The title is =====" , e)
      setDropDownSelected(e);
      switch (e){
        case "Today": 
          setDaySelected(today);
          console.log("The title Today =====" , today)
          break;
        case "Yesterday":
          setDaySelected(yesterday);
          console.log("The title Yesterday =====" , yesterday)
          break;
        case "Tomorrow":
          setDaySelected(tomorrow);
          console.log("The title Tomorrow =====" , tomorrow)
          break;

      }
   };
    const [dropdownSelected , setDropDownSelected] = useState('Today');
    const [daySelected, setDaySelected] = useState(new Date());
    const [DropdownButtonDate, setDropdownButtonDate] = useState({});
    // setDropdownButtonDate = handleChange;
 
  return (
    <div className="App">
        <BarNav/>
        <h1 className="TitleReservations" variant="h1" Wrap>
          Due Date Returns
        </h1>

        {/* <div class="col-md-20">
          <Dropdown className="Dropdown" options={options} value={'Today'} 
          variant="secondary btn-sm"/> 
        </div> */}
       
        <div className="Dropdown">
        <DropdownButton  title={dropdownSelected} onSelect={handleChange}>
          <DropdownItem  eventKey="Yesterday">Yesterday</DropdownItem>
          <DropdownItem  eventKey="Today">Today</DropdownItem>
          <DropdownItem  eventKey="Tomorrow">Tomorrow</DropdownItem>
        </DropdownButton>
        </div>
      

        <div className="DPk">
          <DatePicker className="datePicker"
            selected={daySelected}
            onChange={date => setDaySelected(date)}
            
            popperPlacement="bottom"
            dateFormat="MMMM d, yyyy"
          /> 
          {/* <img src={Calendar} className="Calendar" alt="calendar" /> */}
        </div>

        <div >
          <ReservationList daySelected={daySelected}/>
        </div>
        <div>
        <Footer2/>
        </div>
    </div>   
  )}


export default App;
