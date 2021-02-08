import { Title } from '@material-ui/icons';
import './App.css';
import BarNav from './BarNav.js';
import Reservations from './Reservations';
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



const EasyRentURL = "https://easyrent-api-dev.cit362.com/reservations"; 
function App() {

  
  const [startDate, setStartDate] = useState(new Date());

  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
    );
    const options = [
      'Yesterday', 'Today', 'Tomorrow'
    ];
    const defaultOption = options[0];

  return (
    <div className="App">
      <BarNav/>
      <h1 className="TitleReservations" variant="h1" Wrap>
        Due Date Reservations
      </h1>
        <div  >
          <Dropdown className="Dropdown" options={options}  value={'Today '} placeholder="Select an option" />
        </div>
        <div className="DPk">
          <DatePicker className="datePicker"
            selected={startDate}
            onChange={date => setStartDate(date)}
            showYearDropdown
            showMonthDropdown
            popperPlacement="bottom"
            dateFormat="MMMM d, yyyy"
          />
          <img src={Calendar} className="Calendar" alt="calendar" />
        </div>
      <div className="ReservationsMain">
        <Reservations className= "itemsReservation" name=" Steve Jobs " dueDate=" 02/06/21 " items=" 1 "/>
        <Reservations className= "itemsReservation" name=" Sherlock  " dueDate=" 02/06/21 " items=" 4 "/>
      </div>
    </div>

     
  )}


export default App;
