import React, { useState, TouchableOpacity, useEffect } from 'react';
import Text from 'react-text';
import Button from '@material-ui/core/Button';
import MyVerticallyCenteredModal from './components/Modal';
import Grid from "@material-ui/core/Grid";

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
    midnightDaySelected.setHours(0, 0, 0, 0);
    let midnightDayAfterSelected = new Date(daySelected.getDate() + 1);
    midnightDayAfterSelected.setHours(0, 0, 0, 0);
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
  // Rules to show today, yesterday, and tomorrow Dropdown
  useEffect(() => {
    const { daySelected, show } = props;
    const startDateInMS = new Date();
    startDateInMS.setHours(0, 0, 0, 0);
    const filteredItems = Allitems.filter(({ dueDate }) => {
      return show === 'today'
        ? dueDate <= startDateInMS 
        : show === 'past'
        ? dueDate < startDateInMS
        : dueDate > startDateInMS 
    })
    console.log("This is the start", startDateInMS)
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

  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <>
        <div style={{ overflow: 'auto', height: 'inherit' }}>

          {items
            .filter(customer => customer.reservationItems
            .some(item => !item.returned)).sort((a,b)  => b.dueDate - a.dueDate)
            .map(item => {
              const oneDay = 24 * 60 * 60 * 1000;
              const startDateInMS = new Date();
              startDateInMS.setHours(0, 0, 0, 0);
              const validReturn =  item.dueDate >= startDateInMS;  
              const firstDate = new Date().getTime() - oneDay;
              const secondDate = new Date(item.dueDate);
              const diffDays = Math.round((secondDate - firstDate) / oneDay);
              console.log("first date", startDateInMS)

              return (
                <Grid container>
                <li className="Reservations" key={item.Id} >
                  
                  {/* <div className="Customer" >
                    <Text>Customer:&nbsp;</Text>
                  </div> */}
                <Grid xs={3} item>
                  <div className="CustomerName">
                    {item.customerName} 
                    {/* { new Date(item.dueDate).toString()} */}
                  </div>
                  </Grid>
                  <Grid xs={8} item>
                  <div className="status" >
                    <Text>Days Overdue:&nbsp;</Text>
                    <Text styles={{fontWeight: 'light'}}>{-1 * diffDays}</Text>
                    </div>
                    
                  </Grid>
                  

                  
                  <Grid xs={3} item>
                  <div className="Button">
                    <Button variant="contained" onClick={() => returnItem(item, validReturn)}>
                      Return Items
                    </Button>
                  
                    {reservation.reservationItems?.length && (
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        reservation={reservation}
                        reservationItems={reservation.reservationItems}
                        onSubmit={updateReservations}
                      />
                    )}
                  </div>
                  </Grid>
                  

                </li>
                </Grid>
              )
            })}
        </div >
      </>
    );
  }
}

export default ReservationList;