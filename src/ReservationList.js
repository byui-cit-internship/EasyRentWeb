import React, { useState, TouchableOpacity, useEffect } from 'react';
import Text from 'react-text';
import Button from '@material-ui/core/Button';
import MyVerticallyCenteredModal from './components/Modal';
import Grid from "@material-ui/core/Grid";
import { Filter2 } from '@material-ui/icons';
import Alert from 'react-bootstrap/Alert'

const EasyRentURL = 'https://easyrent-api-dev.cit362.com/reservations'
function ReservationList(props) {

  const { filter, setSuggestions } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [Allitems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [reservation, setReservation] = useState({});

  const { daySelected, show } = props;

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
          setAllItems(
            result
              .filter(customer => {
                return customer.reservationItems.some(
                  item => !item.returned
                )
              })
              .sort((a, b) => b.dueDate - a.dueDate)
          ); // to use later allitems
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
      // reservationItems.some(({ itemId }) => String(itemId).match(regExp))
    );
  };

  const removeRepeated = (item, index, arr) => !arr.slice(0, index).includes(item);

  // Rules to show today, yesterday, and tomorrow Dropdown
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
            .map(item => {
              const startDateInMS = new Date();
              startDateInMS.setHours(0, 0, 0, 0);
              const validReturn = item.dueDate >= startDateInMS;
              const firstDate = new Date().getTime();
              const secondDate = new Date(item.dueDate);
              const diffDays = Math.round((secondDate - firstDate) / oneDay);
              console.log("first date", startDateInMS)

              return (
                <Grid container>
                  <li className="Reservations" key={item.Id} >
                    <Grid xs={3} item>
                      <div className="CustomerName">
                        {item.customerName}
                        {/* {new Date(item.dueDate).toString()} */}
                      </div>
                    </Grid>
                    <Grid xs={8} item>
                      <div className="status" >
                        <Text>Days Overdue:&nbsp;</Text>
                        {-1 * diffDays}
                      </div>


                    </Grid>
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