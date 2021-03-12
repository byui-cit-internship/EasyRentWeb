import React, { useState, TouchableOpacity, useEffect, useRef } from 'react';
import MyVerticallyCenteredModal from './components/Modal';
import Grid from "@material-ui/core/Grid";
import Button from 'react-bootstrap/Button';
import { HourglassFullTwoTone } from '@material-ui/icons';


const EasyRentURL = 'https://easyrent-api-dev.cit362.com/reservations'
function ReservationList(props) {

  const { filter, setSuggestions } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [Allitems, setAllItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [items, setItems] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [reservation, setReservation] = useState({});

  const { daySelected, show, toggle } = props;
  
  console.log(toggle)

  const filterByReturned = (results) => {
    return results.filter(customer => {
      return customer.reservationItems.some(item => !item[toggle])
      // return customer.reservationItems.some(item => !item.returned)
    });
  }
  const updateItems = (results) => {
    setAllItems(filterByReturned(results));
  }

  const getItems = () => {
    const { daySelected } = props;
    let midnightDaySelected = new Date(daySelected);
    midnightDaySelected.setHours(0, 0, 0, 0);
    let midnightDayAfterSelected = new Date(daySelected.getDate() + 1);
    midnightDayAfterSelected.setHours(0, 0, 0, 0);

    fetch(EasyRentURL)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          const results = result.sort((a, b) => b.dueDate - a.dueDate);
          setSearchResults(results);
          updateItems(results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
 
  console.log('toggleone', toggle)

  useEffect(getItems, [])
  useEffect(() => {
    if (!searchResults.length) return;

    updateItems(searchResults);
  }, [toggle])

  const returnItem = (item, validReturn) => {
    if (!validReturn) {
      return alert('Unable to return due to possible late fee');
    }
    setReservation(item);
    setModalShow(true);
  }

  const oneDay = 24 * 60 * 60 * 1000;

  const filterByDate = () => {
    const { show } = props;
    const startDateInMS = new Date();
    startDateInMS.setHours(0, 0, 0, 0);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const todayCurrent = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    tomorrowDate.setHours(0, 0, 0, 0);

    return ({ dueDate }) => {
      console.log("Datedue", startDateInMS)
      console.log("DateDue", dueDate)
      console.log("DateDu", tomorrowDate)
      return show === 'today'
        ? dueDate > todayDate && dueDate < tomorrowDate || dueDate < todayDate
        : show === 'past' 
          ? dueDate < todayDate || dueDate < todayCurrent
          : dueDate > tomorrowDate 
    };
    
  }
  

  const filterBySearch = () => {
    const regExp = new RegExp(filter, 'i');

    return ({ customerId, customerName, reservationItems }) => (
      Boolean(customerName.match(regExp)) ||
      Boolean(customerId.match(regExp)) ||
      reservationItems.some(({ itemId }) => itemId == regExp)
    );
  };

  const removeRepeated = (item, index, arr) => !arr.slice(0, index).includes(item);

  useEffect(() => {
    const itemsFilter = filter
      ? filterBySearch()
      : filterByDate();

    const filteredItems = Allitems.filter(itemsFilter);

    setSuggestions(filteredItems
      .map(item => item.customerName)
      .filter(removeRepeated)
    );

    setItems(filteredItems);
  }, [Allitems, show, daySelected, filter])

  const updateReservations = (reservation, reservationItems) => {
    const data = {
      ...reservation,
      reservationItems
    };

    fetch(EasyRentURL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(() => {
      console.log('Getting items')
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
      
        <div style={{ overflow: 'auto', height: 'inherit', padding: '0 10px' }}>
          {items
            .map(item => {

              const startDateInMS = new Date();
              const todayDate = new Date();
              todayDate.setHours(0, 0, 0, 0);
              const validReturn = item.dueDate >= startDateInMS;
              const firstDate = new Date().getTime(); // currentDate
              const secondDate = new Date(item.dueDate); // dueDateReservation
              const diff = firstDate - secondDate
              const diffDays = Math.round((secondDate - firstDate) / oneDay);
              const daysOverdue = - (diffDays);
              const hours = Math.round(Math.abs( secondDate - firstDate ) / 36e5);
              const hoursLimit = Math.floor(Math.abs( secondDate - firstDate ) / 36e5);
              const minutes = Math.floor((diff/1000)/60);
              const tomorrowDate = new Date();
              tomorrowDate.setDate(tomorrowDate.getDate() + 1);
              tomorrowDate.setHours(0, 0, 0, 0);


              console.log("secondDate", secondDate)
              console.log("firstDate", firstDate)
              console.log("daysOverdue", daysOverdue)
              console.log("startDateInMS", startDateInMS)
              console.log("hours", hours)
              console.log("minutes", minutes)

              const getLabel = () => {
                if (secondDate > todayDate && secondDate < tomorrowDate && secondDate > firstDate) {
                  return 'Due: '; 
                }else if (secondDate > todayDate && secondDate < tomorrowDate && 
                          secondDate < firstDate && minutes < 60){
                    return 'Minutes Overdue: ';
                } else if(secondDate > todayDate && secondDate < tomorrowDate &&
                          secondDate < firstDate && minutes > 59 && hours < 24){
                  return 'Hours Overdue: ';
                } else if (secondDate < todayDate){
                  return 'Days Overdue: '
                } else {
                  return 'Due in: '
                }
              }

              const getDays = () => {
                if (secondDate > todayDate && secondDate < tomorrowDate && secondDate > firstDate){
                  return 'Today';
                } else if (secondDate > todayDate && secondDate < tomorrowDate && 
                            secondDate < firstDate && minutes < 60){
                  return minutes;
                } else if(secondDate > todayDate && secondDate < tomorrowDate &&
                  secondDate < firstDate && minutes > 59 && minutes < 61){
                    return hours;
                } else if(secondDate > todayDate && secondDate < tomorrowDate &&
                          secondDate < firstDate && minutes > 60 && minutes < 120){
                    return hoursLimit;
                } else if(secondDate > todayDate && secondDate < tomorrowDate &&
                            secondDate < firstDate && minutes > 119 && minutes <= 179){
                      return 3;
                }else if(secondDate > todayDate && secondDate < tomorrowDate &&
                         secondDate < firstDate && minutes >= 180){
                      return hours;
                } else if (secondDate < todayDate && daysOverdue === 0){
                    return  1;
                } else if (secondDate < todayDate){
                      return  daysOverdue;
                } else if (daysOverdue === -1 ||  daysOverdue === 1){
                  return ((-1 * daysOverdue) + ' day');
                } else {
                  return ((-1 * daysOverdue) + ' days');
                }
            }
              // const getLabel = () => {
              //   if (secondDate > firstDate && secondDate < tomorrowDate) {
              //     return 'Due: '; 
              //   } else if(daysOverdue === 0 && hours < 25){
              //     return 'Hours Overdue: ';
              //   } else if (daysOverdue > 0 ) {
              //     return 'Due in: ';
              //   } else{
              //     return 'Days Overdue: ';
              //   }
              // }

              // const getDays = () => {
              //   if (secondDate > firstDate && secondDate < tomorrowDate){
              //     return 'Today'
              //   } else if(daysOverdue === 0 && hours < 25){
              //     return hours 
              //   } else if (daysOverdue < 0) {
              //     return ((-1 * daysOverdue) + ' days');
              //   } else {
              //     return daysOverdue
              //   }
              // }

              console.log('dueDate', item.dueDate)
              return (
                <Grid container>
                  <div className="Reservations" key={item.Id} >
                    <Grid xs={3} item>
                      <div className="CustomerName">
                        {item.customerName}
                        {/* {new Date(item.dueDate).toString()} */}
                      </div>
                    </Grid>
                    <Grid xs={6} item>
                      <div className="status" >
                        <strong>{getLabel()}</strong>
                        {getDays()}
                      </div>


                    </Grid>
                    <div >
                    <Button 
                        variant={toggle === 'returned' ? "primary" : "danger"}
                        onClick={() => returnItem(item, validReturn)}>
                        {toggle === 'returned' ? 'Return' : 'Record'} Items
                      </Button>

                      {reservation.reservationItems?.length && (
                        <MyVerticallyCenteredModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                          reservation={reservation}
                          reservationItems={reservation.reservationItems}
                          onSubmit={updateReservations}
                          toggle={toggle}
                        />
                      )}
                    </div>

                  </div>
                </Grid>
              )
            })}
        </div >
      </>
    );
  }
}

export default ReservationList;