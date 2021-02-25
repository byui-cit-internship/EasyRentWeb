import React, { useState, TouchableOpacity, useEffect } from 'react';
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
import MyVerticallyCenteredModal from './components/Modal'

const EasyRentURL = 'https://easyrent-api-dev.cit362.com/reservations'

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

  const { daySelected } = props;
  const getItems = () => {
    const { daySelected } = props;
    let midnightDaySelected = new Date(daySelected);
    midnightDaySelected.setUTCHours(0, 0, 0, 0);
    let midnightDayAfterSelected = new Date(daySelected.getDate() + 1);
    midnightDayAfterSelected.setUTCHours(0, 0, 0, 0);
    console.log('startDate', daySelected)
    const startDateInMS = daySelected.getTime(); // convert date to ms
    console.log('startDateInMS', startDateInMS);

    // const EasyRentURL = 'https://easyrent-api-dev.cit362.com/reservations?dueDateGreaterThan=${midnightDaySelected.getDate()}&dueDateLessThan=${midnightDayAfterSelected.getDate()}'
    fetch(EasyRentURL)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          const oneDay = 24 * 60 * 60 * 1000;

          const filteredItems = result.filter(Item => {
            /* console.log('each date in ms', Item.dueDate);
            let eachDate = new Date(Item.dueDate);
            console.log('each date in format', eachDate);*/

            
            /*console.log('due date', Item.dueDate)
            console.log('startDateInMS', startDateInMS + oneDay)
            */
          
           return Item.dueDate === startDateInMS + oneDay;
            
          //  return (
          //     Item.dueDate > startDateInMS &&
          //     Item.dueDate < startDateInMS + oneDay
          //   );
          })

          setAllItems(result); // to use later allitems
          setItems(filteredItems); // to show filtered items
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  useEffect(getItems, [])

  useEffect(() => {
    const { daySelected } = props;
    const startDateInMS = daySelected.getTime();
    const filteredItems = Allitems.filter(Item => {
      console.log('each date in ms', Item.dueDate);
      let eachDate = new Date(Item.dueDate);
      console.log('each date in format', eachDate);
      if (Item.dueDate > startDateInMS && Item.dueDate < startDateInMS + 24 * 60 * 60 * 1000) return true;
    })
    setItems(filteredItems);
  }, [daySelected])

  const updateReservations = (reservation, reservationItems) => {
    const data = {
      ...reservation,
      reservationItems
    };
    console.log('update data', data)

    fetch(EasyRentURL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(() => {
        console.log('Getting items')
        // Gets all updated items after update
        getItems();
        
      })
  };
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <>

        <div style={{ overflow: 'auto', height: 'inherit' }}>

          {items
            .filter(customer => customer.reservationItems.some(item => !item.returned))
            .map(item => (

              <li className="Reservations" key={item.Id} >

                <div className="Customer" >
                  <Text>Customer:&nbsp;</Text>
                </div>

                <div className="CustomerName">
                  {item.customerName}
                </div>

                <div className="Button">
                  <Button variant="contained"
                    onClick={() => {
                      setReservation(item);
                      setModalShow(true);
                    }}
                  >Return Items
              </Button>

                  {
                    reservation.reservationItems?.length && (
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        reservation={reservation}
                        reservationItems={reservation.reservationItems}
                        onSubmit={updateReservations}
                      />
                    )}
                </div>
              </li>
            ))}

        </div >
      </>
    );
  }
}

export default ReservationList;