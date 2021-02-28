import React, { useState, TouchableOpacity, useEffect } from 'react';
import Text from 'react-text';
import Button from '@material-ui/core/Button';
import MyVerticallyCenteredModal from './components/Modal';
import { Today } from '@material-ui/icons';

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

  const { daySelected, show } = props;

  const getItems = () => {
    const { daySelected } = props;
    let midnightDaySelected = new Date(daySelected);
    midnightDaySelected.setUTCHours(0, 0, 0, 0);
    let midnightDayAfterSelected = new Date(daySelected.getDate() + 1);
    midnightDayAfterSelected.setUTCHours(0, 0, 0, 0);
    const startDateInMS = daySelected.getTime(); // convert date to ms

    fetch(EasyRentURL)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAllItems(result); // to use later allitems
          // setItems(filteredItems); // to show filtered items
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(getItems, [])

  const returnItem = (item, validReturn) => {
    if (!validReturn) {
      return alert('Unable to return due to possible late fee');
    }
    
    setReservation(item);
    setModalShow(true);
  }

  const oneDay = 24 * 60 * 60 * 1000;

  useEffect(() => {
    const { daySelected, show } = props;
    const startDateInMS = daySelected.getTime();
    const filteredItems = Allitems.filter(({ dueDate }) => {
      return show === 'today'
        ? dueDate <= startDateInMS 
        : show === 'past'
          ? dueDate < startDateInMS
          : dueDate >= startDateInMS 
    })

    console.log(filteredItems.length, { filteredItems })
    setItems(filteredItems);
    // getItems();
  }, [Allitems, show, daySelected])

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
    }).then(() => {
      console.log('Getting items')
      // Gets all updated items after update
      getItems();
    })
  };

  const status = (item) => {
  const firstDate = new Date();
  const secondDate = item.dueDate;
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  }
  

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
            .map(item => {
              const startDateInMS = daySelected.setUTCHours(0,0,0,0);// + oneDay
              
              const validReturn =  item.dueDate >= startDateInMS;
              // && (show === 'today' && item.dueDate <= startDateInMS)
              // const validReturn = (show === 'today' && item.dueDate <= startDateInMS)
              console.log("startDateInMS1", startDateInMS)
              
                const firstDate = new Date().setUTCHours(0,0,0,0);
                const secondDate = new Date(item.dueDate).setUTCHours(0,0,0,0);
                const diffDays = Math.round((secondDate - firstDate) / oneDay)
                console.log("first", firstDate)
            

              return (

                <li className="Reservations" key={item.Id} >

                  <div className="Customer" >
                    <Text>Customer:&nbsp;</Text>
                    
                  </div>

                  <div className="CustomerName">
                    {item.dueDate} 
                    
                    {/* {new Date(item.dueDate).toString()} */}
                  </div>

                  <div className="status" >
                    <Text>Status:&nbsp;</Text>
                    
                  </div>

                  <div className="statusReservation">
                  
                  {diffDays}
                  
                    
                    {/* {new Date(item.dueDate).toString()} */}
                  </div>

                  <div className="Button">
                    <Button variant="contained" onClick={() => returnItem(item, validReturn)}>
                      Return Items
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
              )
            })}

        </div >
      </>
    );
  }
}

export default ReservationList;