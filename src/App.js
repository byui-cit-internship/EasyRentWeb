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
import Button from 'react-bootstrap/Button';
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
  const ExampleCustomInput = ({ value, onClick }) => (
    
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
    );
    const options = [ 
      'Yesterday', 'Today', 'Tomorrow'
    ];
    const defaultOption = options[0];
  
    const [framework , setFramework] = useState('Today');
    function handleChange(e){
      setFramework(e.target.title);
   };

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
        <DropdownButton  onChange={handleChange} title={framework}>
          <DropdownItem as="button"><div onClick={(e) => setFramework(e.target.textContent)}>Yesterday</div></DropdownItem>
          <DropdownItem as="button"><div onClick={(e) => setFramework(e.target.textContent)}>Today</div></DropdownItem>
          <DropdownItem as="button"><div onClick={(e) => setFramework(e.target.textContent)}>Tomorrow</div></DropdownItem>
        </DropdownButton>
        </div>
      

        <div className="DPk">
          <DatePicker className="datePicker"
            selected={startDate}
            onChange={date => setStartDate(date)}
            popperPlacement="bottom"
            dateFormat="MMMM d, yyyy"
          /> 
          {/* <img src={Calendar} className="Calendar" alt="calendar" /> */}
        </div>

        <div >
          <ReservationList startDate={startDate}/>
        </div>
        <div>
        <Footer2/>
        </div>
    </div>   
  )}


export default App;
