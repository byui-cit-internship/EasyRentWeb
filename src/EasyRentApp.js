import React, { useState, TouchableOpacity, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Text from 'react-text';
import Modal from 'react-bootstrap/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const EasyRentURL = "https://easyrent-api-dev.cit362.com/reservations";

function MyVerticallyCenteredModal(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [reservation, setReservation] = useState(props.reservation || { reservationItems: [] });

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

          {
            props.reservation.reservationItems.map(item => (
              <div>
                <FormControlLabel
                  id={item.description}
                  control={<Checkbox style={{ color: 'primary' }} />}
                  label={`${item.description}${invalidReturn ? ' - disabled' : ''}`}
                />
              </div>
            ))
          }

        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button 
            className="ReturnButton"
            style={{ color: "white", background: "#80C140", width: '90px' }} 
            onClick={props.onHide}>
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
  const [items, setItems] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [reservation, setReservation] = useState({});


  useEffect(() => {
    fetch(EasyRentURL)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div >
          {items.map(item => (
            <li className="Reservations" key={item.id}>
              <div className="Customer" >
                <Text>Customer:&nbsp;</Text>
              </div>

              <div className="CustomerName">
                {item.customerName}
              </div>

              <div className="Button">

                <Button style={{ FormatColorFill: "#006EB6" }} variant="contained" onClick={() => {
                  setReservation(item);
                  setModalShow(true);
                  console.log(JSON.stringify(item))
                }}

                >
                  Check Reservations Items
              </Button>

                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  reservation={reservation}
                  reservationItems={reservation.reservationItems}
                />
              </div>
            </li>
          ))}
        </div >
      </>
    );
  }
}

export default ReservationList;

