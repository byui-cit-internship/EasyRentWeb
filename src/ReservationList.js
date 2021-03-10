import React, { useState, TouchableOpacity, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import MyVerticallyCenteredModal from './components/Modal';
import Grid from "@material-ui/core/Grid";


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

    return ({ dueDate }) => {
      return show === 'today'
        ? dueDate <= startDateInMS
        : show === 'past'
          ? dueDate < startDateInMS
          : dueDate > startDateInMS
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
              startDateInMS.setHours(0, 0, 0, 0);
              const dueDateReservation = item.dueDate;
              const validReturn = item.dueDate >= startDateInMS;
              const firstDate = new Date().getTime()- oneDay;
              const secondDate = new Date(item.dueDate);
              const diffDays = Math.round((secondDate - firstDate) / oneDay);
              const daysOverdue = - (diffDays);
              const hours = Math.round(Math.abs(secondDate - firstDate) / 36e5);

              const getLabel = () => {
                if (daysOverdue === 0 && !validReturn) {
                  return 'Hours Overdue: '; 
                } else if(daysOverdue === 0){
                  return 'Due: ';
                } else if (daysOverdue < 0) {
                  return 'Due in: ';
                } else{
                  return 'Days Overdue: ';
                }
              }

              const getDays = () => {
                if (daysOverdue === 0 && !validReturn) {
                  return (hours);
                } else if (daysOverdue === 0){
                  return 'Today'
                } else if (daysOverdue < 0) {
                  return ((-1 * daysOverdue) + ' days');
                } else {
                  return daysOverdue
                }
              }
              console.log('dueDate', item.dueDate)
              return (
                <Grid container>
                  <li className="Reservations" key={item.Id} >
                    <Grid xs={3} item>
                      <div className="CustomerName">
                        {item.dueDate}
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
                      <Button variant="contained" onClick={() => returnItem(item, validReturn)}>
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