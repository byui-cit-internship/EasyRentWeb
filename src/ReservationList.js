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


import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import Footer from './Footer';
import Footer2 from './Footer2';

const EasyRentURL = "https://easyrent-api-dev.cit362.com/reservations"; 

function MyVerticallyCenteredModal(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

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
         
               {
                 props.reservationItems.map(item => (
                    <div>
                      <FormControlLabel
                      id={item.description} 
                      control={<Checkbox color="primary"  />}
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
          style={{ color: "white", background: "#6B9D41", width: '90px'}} onClick={props.onHide}><Text>Return</Text>
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
        <div style={{overflow:'auto', height: 'inherit'}}>
        
        {items.map(item => (
          <li className="Reservations"  key={item.id} >
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
                Return Items
              </Button>
                  
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                reservation={reservation}
                reservationItems={reservation.reservationItems ? reservation.reservationItems : []}
              />
            </div>
          </li>
        ))}

      </div >
          <Footer2/>
          <Footer/>

    </>
    );
  }
}

export default ReservationList;

