import React, {useState, TouchableOpacity, useEffect} from 'react';
import App from './App.css';
import Button from '@material-ui/core/Button';
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
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Select from 'react-select'

const EasyRentURL = "https://easyrent-api-dev.cit362.com/reservations"; 

function MyVerticallyCenteredModal(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  // const [reservationItems, setReservationItems] = useState(props.reservationItems);
  const [reservation, setReservation] = useState(props.reservation || {reservationItems: []});
 
  let options = [];
  const { reservationItems = []}  = props;
  options = reservationItems.map(item =>({label: item.description, value: item.description}))
  // const options = [
  //   { label: 'Thing 1', value: 1},
  //   { label: 'Thing 2', value: 2},
  // ];
  console.log(options)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title  id="contained-modal-title-vcenter">
          Reservation Items
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div >
         
              {/* {props.reservation.reservationItems.map((itemsR, i) => (
                <p key={i} >
                  {itemsR.description}
                </p>
              
              ))}
               */}
               {/*
                 props.reservation.reservationItems.map(item => (
                    <div>{item.description}</div>
                 ))
                 */}
               
               <Select options={options} 
               isMulti />
               {/* <ReactMultiSelectCheckboxes options={options} /> */}
               
               {/* {JSON.stringify(props.reservation)} */}
               
            
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
        <Button className="ReturnButton"
          style={{ color: "white", background: "#80C140", width: '90px'}} onClick={props.onHide}><Text>Return</Text>
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

              <Button style={{ FormatColorFill:"#006EB6"}} variant="contained"  onClick={() => { 
                setReservation(item);
                setModalShow(true);
                // <Text>{selectedReservation.reservationItems}</Text> 
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

