import React, { useState, TouchableOpacity, useEffect, useRef } from 'react';
import MyVerticallyCenteredModal from './components/Modal';
import Grid from "@material-ui/core/Grid";
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar'
import updateReservations from './services/updateReservations';
import getItems from './services/getItems';
import getDays from './services/getDays';
import { filterByReturned, filterBySearch, filterRepeated } from './services/filters';

const calcPerc = (items = []) => {
  return items.filter(({ returned }) => returned).length / items.length * 100;
}
const getTotals = (items = []) => {
  return `${items.filter(({ returned }) => returned).length}/${items.length}`
}

function ReservationList(props) {

  const { filter, setSuggestions } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [modalShow, setModalShow] = React.useState(false);
  const [reservation, setReservation] = useState({});

  const { daySelected, show, toggle, setCheckboxState } = props;
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

              // const validReturn = item.dueDate >= today;
              const currentDate = new Date();
              const dateToday = currentDate.getDay();
              const currentTime = new Date();
              currentTime.getHours();

              const reservationDue = new Date(item.dueDate);
              reservationDue.setHours(0, 0, 0, 0);

              const reservationExtra = new Date(item.dueDate);
              reservationExtra.setHours(0, 0, 0, 0);
              reservationExtra.setDate(reservationExtra.getDate() + 1);

              const reservationExtraTimeMon = new Date(item.dueDate);
              reservationExtraTimeMon.setHours(11, 0, 0, 0);
              reservationExtraTimeMon.setDate(reservationExtraTimeMon.getDate() + 1);

              const setHourMonday = new Date();
              setHourMonday.setHours(14, 0, 0, 0);

              const setHourTue_Fri = new Date();
              setHourTue_Fri.setHours(14, 0, 0, 0);

              const setHourSat = new Date();
              setHourSat.setHours(9, 0, 0, 0);

              const oneDay = 24 * 60 * 60 * 1000;
              const todayDate = new Date();
              todayDate.setHours(0, 0, 0, 0);

              const firstDate = new Date().getTime(); // currentDate
              const secondDate = new Date(item.dueDate); // dueDateReservation
              const diffDays = Math.ceil((secondDate - firstDate) / oneDay);
              const daysOverdue = - (diffDays);

              const hoursMonday = Math.ceil(Math.abs(setHourMonday - currentTime) / 36e5);
              const hoursTue_Fri = Math.ceil(Math.abs(setHourTue_Fri - currentTime) / 36e5);
              const hoursSat = Math.ceil(Math.abs(setHourSat - currentTime) / 36e5);

              const diffMin = setHourTue_Fri - currentTime;
              const minutesOverdue = Math.floor((diffMin / 1000) / 60);

              console.log('reservationDue ================', reservationDue)
              console.log('reservationExtra', reservationExtra)
              console.log('today', today)
              console.log('dateToday', dateToday)
              console.log('currentTime', currentTime)
              console.log('setHourMonday', setHourMonday)
              console.log('setHourTue_Fri', setHourTue_Fri)
              console.log('setHourSat', setHourSat)

              /*const validReturn = (
                (reservationDue.valueOf() === today.valueOf())
                ||
                ((dateToday === 1
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourMonday))
                ||
                ((dateToday >= 2 || dateToday <= 5)
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourTue_Fri)
                ||
                (dateToday === 6
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourSat)
              );*/

              const validReturn = (
                reservationDue.valueOf() === today.valueOf() || (
                  reservationExtra.valueOf() === today.valueOf() && (
                    dateToday === 1 && currentTime < setHourMonday ||
                    dateToday >= 2 || dateToday <= 5 && currentTime < setHourTue_Fri ||
                    dateToday === 6 && currentTime < setHourSat
                ))
              );

              console.log('validReturn', validReturn)
              console.log(item)

              const getLabel = () => {
                if (reservationDue.valueOf() === today.valueOf()) {
                  return 'Due: ' // Today
                } else if (dateToday === 1
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourMonday) {
                  return 'Due in: '; // 2 Hours Grace on Monday
                } else if ((dateToday === 2 || dateToday === 3 ||
                  dateToday === 4 || dateToday === 5)
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourTue_Fri) {
                  return 'Due in : '; // 2 Hours Grace from Tue-Fri
                } else if (dateToday === 6
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourSat) {
                  return 'Due in: '; // 2 Hours Grace on Sat
                } else if (dateToday === 1
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime > setHourMonday) {
                  return 'Overdue by: '; // Past Monday
                } else if ((dateToday === 2 || dateToday === 3 ||
                  dateToday === 4 || dateToday === 5)
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime > setHourTue_Fri) {
                  return 'Overdue by: ' // Past Tue-Fri
                } else if (dateToday === 6
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime > setHourSat) {
                  return 'Overdue by: ' // Past Sat
                } else if (reservationExtra.valueOf() < today.valueOf()) {
                  return 'Overdue by: ' // Past Sat
                } else {
                  return 'Due in: ' // Future
                }
              }

              const getDays = () => {
                if (reservationDue.valueOf() === today.valueOf()) {
                  return 'Today'; // Today
                } else if (dateToday === 1
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourMonday
                  && hoursMonday === 1) {
                  return minutesOverdue === 1 ? minutesOverdue + ' Minute' : minutesOverdue + ' Minutes';
                } else if (dateToday === 1
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourMonday) {
                  return hoursMonday === 1 ? hoursMonday + ' Hour' : hoursMonday + ' Hours'; // 2 Hours Grace on Monday
                } else if ((dateToday === 2 || dateToday === 3 ||
                  dateToday === 4 || dateToday === 5)
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourTue_Fri
                  && hoursTue_Fri === 1) {
                  return minutesOverdue === 1 ? minutesOverdue + ' Minute' : minutesOverdue + ' Minutes';
                } else if ((dateToday === 2 || dateToday === 3 ||
                  dateToday === 4 || dateToday === 5)
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourTue_Fri) {
                  return hoursTue_Fri === 1 ? hoursTue_Fri + ' Hour' : hoursTue_Fri + ' Hours'; // 2 Hours Grace from Tue-Fri
                } else if (dateToday === 6
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourSat
                  && setHourSat === 1) {
                  return minutesOverdue === 1 ? minutesOverdue + ' Minute' : minutesOverdue + ' Minutes';
                } else if (dateToday === 6
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime < setHourSat) {
                  return hoursSat === 1 ? hoursSat + ' Hour' : hoursSat + ' Hours'; // 2 Hours Grace on Sat
                } else if (dateToday === 1
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime > setHourMonday) {
                  return daysOverdue === 1 ? daysOverdue + ' Day' : daysOverdue + ' Days';// Past Monday
                } else if ((dateToday === 2 || dateToday === 3 ||
                  dateToday === 4 || dateToday === 5)
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime > setHourTue_Fri) {
                  return daysOverdue === 1 ? daysOverdue + ' Day' : daysOverdue + ' Days'; // Past Tue-Fri
                } else if (dateToday === 6
                  && reservationExtra.valueOf() === today.valueOf()
                  && currentTime > setHourSat) {
                  return daysOverdue === 1 ? daysOverdue + ' Day' : daysOverdue + ' Days'; // Past Sat
                } else if (reservationExtra.valueOf() < today.valueOf()) {
                  return daysOverdue === 1 ? daysOverdue + ' Day' : daysOverdue + ' Days';
                } else {
                  return - daysOverdue === 1 ? - daysOverdue + ' Day' : - daysOverdue + ' Days';// Future
                }
              }

              return (

                <Grid container>


                  <div className="Reservations" key={item.Id} >

                    <Grid xs={3} item>

                      <div className="CustomerName"  >
                        {item.customerName}
                        {/* {new Date(item.dueDate).toString()}  */}
                      </div>

                    </Grid>

                    <Grid xs={6} item>

                      <div className="status" >
                        <strong>{getLabel()}</strong>
                                {getDays()}
                      </div>
                    </Grid>

                    <div className="status" >
                      <Button
                        // disabled={!validReturn}
                        variant={toggle === 'returned' ? "primary" : "dark"}
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
                    <ProgressBar
                      className='ProgressBar'
                      variant={toggle === 'returned' ? "primary" : "dark"}
                      now={calcPerc(item.reservationItems)}
                      label={getTotals(item.reservationItems)}
                    />

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