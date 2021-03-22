import React, {useState, TouchableOpacity, useEffect} from 'react';
import Button from 'react-bootstrap/Button';

const ButtonReservation = () => (
    <div>
        <Button variant="contained" onClick={() => { 
          setReservation(item);
          setModalShow(true);
          console.log(JSON.stringify(item))
          }}>
          Return Items
       </Button>
    </div>
  );
export default ButtonReservation;