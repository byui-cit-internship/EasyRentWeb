import React, { useState, TouchableOpacity, useEffect, useRef } from 'react';
import MyVerticallyCenteredModal from './components/Modal';
import { getApiRoot } from './utils/UrlLogic.js';
import Grid from "@material-ui/core/Grid";
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar'
import updateReservations from './services/updateReservations';
import getItems from './services/getItems';
import getDays from './services/getDays';
import { filterByReturned, filterBySearch, filterRepeated } from './services/filters';

console.log(`API Root: ${getApiRoot()}`);

const EasyRentURL = `${getApiRoot()}/reservations`;
function ReservationList(props) {
  const { filter, setSuggestions } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [modalShow, setModalShow] = React.useState(false);
  const [reservation, setReservation] = useState({});

  const { daySelected, show, toggle } = props;
  const { today, tomorrow } = getDays();

  const updateItems = (results) => {
    console.log('updating items', results)
    const newItems = filterByReturned(results, toggle);
    setItems(newItems);

    const itemsFilter = filter
      ? filterBySearch(filter)
      : (() => true);

    const filteredItems = newItems.filter(itemsFilter);

    setSuggestions(filteredItems
      .map(item => item.customerName)
      .filter(filterRepeated)
    );
  }

  const onGetItems = async () => {
    const { show, toggle } = props;
    const recorded = toggle === 'recorded';

    const results = await getItems({ recorded, show, toggle });

    setIsLoaded(true);
    updateItems(results);
  }

  const returnItem = (item, validReturn) => {
    if (!validReturn) {
      return alert('Unable to return due to possible late fee');
    }
    setReservation(item);
    setModalShow(true);
  }

  useEffect(onGetItems, [show, toggle, daySelected, filter]);

  useEffect(() => {
    if (items.length) {
      updateItems(items);
    }
  }, [toggle])

  const onUpdateReservations = async (reservation, reservationItems) => {
    await updateReservations({
      ...reservation,
      reservationItems
    });

    console.log('Getting items')
    onGetItems();
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
              const validReturn = item.dueDate <= tomorrow;
              const currentDate = new Date();
              const dateToday = currentDate.getDay();
              const currentTime = new Date();
              currentTime.getHours();

              const reservationDue = new Date(item.dueDate);
              reservationDue.setHours(0, 0, 0, 0);

              const reservationExtra = new Date(item.dueDate);
              reservationExtra.setHours(0, 0, 0, 0);
              reservationExtra.setDate(reservationExtra.getDate() + 1);

              const setHourMonday = new Date();
              setHourMonday.setHours(10, 0, 0, 0);

              const setHourTue_Fri = new Date();
              setHourTue_Fri.setHours(11, 0, 0, 0);

              const setHourSat = new Date();
              setHourSat.setHours(9, 0, 0, 0);

              const getLabel = () => {
                if (reservationDue.valueOf() === today.valueOf()) {
                  return 'Due: ' // Today
                } else if (dateToday === 1
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourMonday) {
                  return 'Due in: '; // 2 Hours Grace on Monday
                } else if (dateToday === 2 || dateToday === 3 ||
                  dateToday === 4 || dateToday === 5
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourTue_Fri) {
                  return 'Due in: '; // 2 Hours Grace from Tue-Fri
                } else if (dateToday === 6
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourSat) {
                  return 'Due in: '; // 2 Hours Grace on Sat
                } else if (dateToday === 1
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime > setHourMonday
                  || reservationExtra.valueOf() < today.valueOf()) {
                  return 'Overdue by: '; // Past Monday
                } else if (dateToday === 2 || dateToday === 3 ||
                  dateToday === 4 || dateToday === 5 || dateToday === 0
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime > setHourTue_Fri
                  || reservationExtra.valueOf() < today.valueOf()) {
                  return 'Overdue by: ' // Past Tue-Fri
                } else if (dateToday === 6
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime > setHourSat
                  || reservationExtra.valueOf() < today.valueOf()) {
                  return 'Overdue by: ' // Past Sat
                } else {
                  return 'Due in: ' // Future
                }
              }

              return (

                <Grid container>
                  <div className="Reservations" key={item.Id} >
                    <Grid xs={11} item>
                      <div className="CustomerName"  >
                        {/* {item.customerName} */}
                        {new Date(item.dueDate).toString()}
                      </div>
                    </Grid>
                    <Grid xs={9} item>
                      <div className="status" >
                        <strong>{getLabel()}</strong>
                        {/* {getDays()} */}
                        {/* <ProgressBar 
                        className='ProgressBar'
                        variant={toggle === 'returned' ? "primary" : "danger"} 
                        now={90} label={`${3}/6`} 
                      /> */}
                      </div>
                    </Grid>
                    <div>
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
                          onSubmit={onUpdateReservations}
                          toggle={toggle}
                          validReturn={validReturn}
                        />
                      )}
                    </div>
                  </div>
                </Grid>
              )
            }
            )
          }
        </div >
      </>
    );
  }
}
export default ReservationList;