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

const EasyRentURL = 'https://easyrent-api-dev.cit362.com/reservations'

function MyVerticallyCenteredModal(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState({});

  console.log('props. =======', props.reservationItems);
  console.log('==========reser ******', props.reservationItems)
  const obj = {}
  props.reservationItems.map(item => { obj[item.uniqueItemId] = false })
  const [checkboxState, setCheckboxState] = useState(obj)
  console.log('checkboxState', checkboxState)
  const handleChange = (event) => {
    setCheckboxState({ ...checkboxState, [event.target.name]: event.target.checked })
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

  if (!checkedAll && allChecked) {
    setCheckedAll(true);
  }
  if (checkedAll && !allChecked) {
    setCheckedAll(false);
  }

  const submitAndClose = () => {
    const reservationItems = JSON.parse(JSON.stringify(props.reservationItems));
    
    reservationItems.forEach((item, index) => {
      item.returned = checkboxState[index];
    });

    props.onHide();
    props.onSubmit(props.reservation, reservationItems);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reservation Items
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div >
          <div>
            <FormControlLabel
              control={<Checkbox color="primary" onChange={onCheckAll} checked={checkedAll} />}
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
            style={{ width: '90px', backgroundColor: "#80C140", color: "white" }} onClick={submitAndClose}>
            <Text>Return</Text>
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

  const { daySelected } = props;

  useEffect(() => {
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
          const filteredItems = result.filter(Item => {
            console.log('each date in ms', Item.dueDate);
            let eachDate = new Date(Item.dueDate);
            console.log('each date in format', eachDate);
            if (Item.dueDate > startDateInMS && Item.dueDate < startDateInMS + 24 * 60 * 60 * 1000) return true;
          })

          setAllItems(result); // to use later allitems
          setItems(filteredItems); // to show filtered items
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])



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
      data: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(console.log)
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