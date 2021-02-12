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
import Footer from './Footer';
import Footer2 from './Footer2';



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
          Due Date Returns
        </h1>

        <div className="Dropdown">
          <Dropdown className="DropdownColor" options={options} value={'Today'} />
        </div>

        <div className="DPk">
          <DatePicker className="datePicker"
            selected={startDate}
            onChange={date => setStartDate(date)}
            popperPlacement="bottom"
            dateFormat="MMMM d, yyyy"
          /> 
          <img src={Calendar} className="Calendar" alt="calendar" />
        </div>

        <div >
          <ReservationList/>
        </div>
    </div>   
  )}


export default App;
