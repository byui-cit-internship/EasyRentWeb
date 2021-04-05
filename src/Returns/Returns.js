import React, { useState, TouchableOpacity, useEffect, useRef, Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-dropdown/style.css';
import ReservationList from '../ReservationList';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Grid from "@material-ui/core/Grid";

// const today = new Date();
// today.setHours(0, 0, 0, 0);
// const pastDue = new Date(today);
// const future = new Date(today);
// pastDue.setDate(today.getDate() - 1);
// future.setDate(today.getDate() + 1);
// const midnightToday = new Date();
// midnightToday.setHours(0, 0, 0, 0);
// const midnightYesterday = new Date();
// midnightYesterday.setDate(midnightToday.getDate() - 1);
// midnightYesterday.setHours(0, 0, 0, 0);
// const midnightTomorrow = new Date();
// midnightTomorrow.setDate(midnightTomorrow.getDate() + 1);
// midnightTomorrow.setHours(0, 0, 0, 0);




class Returns extends Component{
//     App(props) {

//         const [startDate, setStartDate] = useState(new Date());
//         const [dropdownSelected, setDropDownSelected] = useState('Today');
//         const [daySelected, setDaySelected] = useState(today);
//         const [DropdownButtonDate, setDropdownButtonDate] = useState({});
//         const [show, setShow] = useState('today');
//         const [filter, setFilter] = useState('');
//         const [suggestions, setSuggestions] = useState([]);
//         const [switchToggle, setSwitchToggle] = useState(true);
      
//         const toggleChecked = () => {
//           setSwitchToggle(!switchToggle);
//         }
      
//         function handleChange(e) {
//           console.log("The title is =====", e);
//           setDropDownSelected(e);
//           switch (e) {
//             case "Today":
//               setDaySelected(today);
//               console.log("The title Today =====", today);
//               setShow('today');
//               break;
//             case "Past Due":
//               setDaySelected(pastDue);
//               console.log("The title PastDue =====", pastDue);
//               setShow('past');
//               break;
//             case "Future":
//               setDaySelected(future);
//               console.log("The title Future =====", future);
//               setShow('future');
//               break;
//           }
//         };
      
//         const toggle = ({
//           true: 'returned',
//           false: 'recorded'
//         })[switchToggle];
      
//         // const togle = switchToggle ? 'returned' : 'recorded';
//         const context = {
//           toggle,
//           suggestions,
//           filter,
//           setFilter
//         };
//       }
    
    render() {
        return (
            <h1>Returns Page</h1>
//             <Context.Provider value={context}>
//               <div className="App">
                
//                 <Grid alignItems="center" container>
//                   <Grid xs={3} sm={3} alignItems="center" item />
//                   <Grid xs={6} sm={6} alignItems="center" item>
//                     {/* style={{ color: !switchToggle ? '#252222' : '' }}> */}
//                     <h1 className={"TitleReservations"} variant="h1">
//                       Returns by Due Date
//                     </h1>
//                   </Grid>
//                   <Grid xs={3} sm={3} alignItems="center" item>
//                     <div>
//                       <BootstrapSwitchButton
//                         checked={switchToggle}
//                         onChange={toggleChecked}
//                         width={110}
//                         onlabel={'Outside'}
//                         offlabel={'Inside'}
//                         offstyle={'dark'}
//                       />
//                     </div>
//                   </Grid>
//                 </Grid>
        
//                 {!filter && switchToggle && <>
//                   <div className="Dropdown">
//                     <DropdownButton title={dropdownSelected} onSelect={handleChange}>
//                       <DropdownItem eventKey="Past Due">Past Due</DropdownItem>
//                       <DropdownItem eventKey="Today">Today</DropdownItem>
//                       <DropdownItem eventKey="Future">Future</DropdownItem>
//                     </DropdownButton>
//                   </div>
//                   <div className="DPk">
//                     <DatePicker className="datePicker"
//                       selected={
//                         daySelected.valueOf()
//                         !== today.valueOf()
//                         ? daySelected
//                         : daySelected
//                       }
//                       onChange={date => setDaySelected(date)}
//                       popperPlacement="bottom"
//                       dateFormat="MMMM d, yyyy"
//                     />
//                   </div>
//                 </>
//                 }
//                 <div>
//                   <ReservationList
//                     setSuggestions={setSuggestions}
//                     filter={filter}
//                     show={show}
//                     daySelected={daySelected}
//                     toggle={toggle}
//                   />
//                 </div>
//               </div>
//             </Context.Provider>
          )
    }   
}

export default Returns