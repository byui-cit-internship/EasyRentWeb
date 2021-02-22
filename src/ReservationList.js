import React, {useState, TouchableOpacity, useEffect} from 'react';
import App from './App.css';
import { FormatColorFill } from '@material-ui/icons';
import { View } from 'react-view';
import Text from 'react-text';
import FlatList from 'flatlist-react';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Select from 'react-select'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Footer from './Footer';
import Footer2 from './Footer2';
import Divider from '@material-ui/core/Divider';


// const populateChecked = ( items ) => { 
// let counter = 0;
// let checked = {};
// items.forEach((item) => {
//   checked[counter++] = item.returned;
// })
// return checked;
// }
// football
// baseball

function MyVerticallyCenteredModal(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState({});

  console.log('props. =======', props.reservationItems);
  /*
  React renders the componet multiple times, and it migth render a component initially with no value
  */
  console.log('==========reser ******', props.reservationItems)
  const obj = {}
  props.reservationItems.map(item => {obj[item.uniqueItemId] = false})
  const [checkboxState, setCheckboxState] = useState(obj)

  // if (!props.reservationItems.length) return null;
  const handleChange = (event) => {
    setCheckboxState({...checkboxState, [event.target.name]: event.target.checked})
    console.log('============ the state is: ', checkboxState)
  }

  const onCheckAll = (event) => {
    const update = {}
    if (event.target.checked) {
      props.reservationItems.map(item => { 
        update[item.uniqueItemId] = true;
      })
    } else {
      props.reservationItems.map(item => { 
        update[item.uniqueItemId] = false;
      })
    }
    setCheckboxState(update)
    setCheckedAll(event.target.checked);
  }
  let allChecked = true;
  props.reservationItems.forEach(item => {
    if (!checkboxState[item.uniqueItemId]) allChecked = false;
  })
  
  if ( !checkedAll &&  allChecked) {
    setCheckedAll(true);
  }
  if (checkedAll && !allChecked) {
    setCheckedAll(false);
  }
  
  /*
   Hooks are called in the exact same order
    Hooks cannot be used inside loops, if statements, functions. They can't be nested in anything
    Async setState => 
      React never sets any variable or state in sync.
      ex: useState() , class component => this.setSate() => asycn in nature
    => meaning => we can't be sure that there value would be updated on the next line.

    ** Never update any state in a for loop.
    try to first create the whole state with the updated values and then set the state at 
    once.

    ControlledComponents => 
    Whenever we deal with forms, react tries to sync the form value (ex: <input value={state.value}) />)
    So if we try to initialize state with empty object first, then try to add some value to it, it will throw controlled componet error.

  */

  console.log('the hecked state is======', checkboxState)

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title  id="contained-modal-title-vcenter">
          Reservation Items
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div >
          <div>
          <FormControlLabel 
            control={<Checkbox color="primary" onChange={onCheckAll} checked={checkedAll}  />}
            label="Check / Uncheck All" 
          />
          <Divider />
          </div>
               {
                 props.reservationItems.map(item => (
                    <div>
                      <FormControlLabel
                      control={
                        <Checkbox 
                          color="primary" 
                          checked={checkboxState[item.uniqueItemId]} 
                          name={item.uniqueItemId} 
                          onChange={handleChange} 
                          />
                        }
                      label={item.description}
                  />
                  </div>
                 )) 
              }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
        <Button className="ReturnButton"
          style={{ width: '90px',backgroundColor:"#80C140", color:"white"}} onClick={props.onHide}><Text>Return</Text>
        </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

function ReservationList(props) {
  
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [Allitems, setAllItems] = useState([]);
    const [items, setItems] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [reservation, setReservation] = useState({});
    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState({});
    const [dueDate, setDueDate] = useState({});

    const {daySelected} = props;
    
    useEffect(() => {  
      const {daySelected} = props;
      let midnightDaySelected = new Date(daySelected.getTime());
      midnightDaySelected.setUTCHours(0,0,0,0);
      console.log('midnightDaySelected=====', midnightDaySelected.getTime())
      const startingTimeStamp = midnightDaySelected.getTime();
      console.log('startingTimeStamp=====', startingTimeStamp)
      const endingTimeStamp = midnightDaySelected.getTime() + 24 * 60 * 60 * 1000;
      console.log('endingTimeStamp=====', endingTimeStamp)
      let midnightDayAfterSelected = new Date(daySelected.getDate() +1);
      midnightDayAfterSelected.setUTCHours(0,0,0,0);
        console.log('startDate', daySelected)
        const startDateInMS = daySelected.getTime(); // convert date to ms
        console.log('startDateInMS', startDateInMS);
        const EasyRentURL = 'https://easyrent-api-dev.cit362.com/reservations?dueDateGreaterThan='+startingTimeStamp+'&dueDateLessThan='+endingTimeStamp;
      
        // const EasyRentURL = `https://easyrent-api-dev.cit362.com/reservations`
        console.log("EasyRent", EasyRentURL)
        fetch(EasyRentURL)
        .then(res => res.json())
        .then(
            (result) => {
               console.log("result====", result)
            setIsLoaded(true);
            // const filteredItems = result.filter( Item => {
            //   console.log('each date in ms', Item.dueDate);
            //   let eachDate = new Date(Item.dueDate);
            //   console.log('each date in format', eachDate);
            //   if (Item.dueDate > startDateInMS  && Item.dueDate < startDateInMS + 24 * 60 * 60 * 1000) return true;
            // })
             
            // setAllItems(result); // to use later allitems
            setItems(result.reservationItems); // to show filtered items
            },
        (error) => {
          console.log("error======", error)
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [daySelected])

   

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <>
        <div style={{overflow:'auto', height: 'inherit'}}>
          
        {items.map(item => (
          
          <li className="Reservations"  key={item.Id} >

            <div className="Customer" >
              <Text>Customer:&nbsp;</Text>  
            </div>

            <div className="CustomerName">
              {item.dueDate}
            </div>   

            <div className="Button">
              <Button variant="contained" 
                onClick={() => { 
                setReservation(item);
                setModalShow(true);}}
              >Return Items
              </Button>

              { 
                reservation.reservationItems && reservation.reservationItems.length && <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                reservation={reservation}
                reservationItems={reservation.reservationItems}
              />
              }
            </div>
          </li>
        ))}

      </div >
      <Footer/>
    </>
    );
  }
}

export default ReservationList;