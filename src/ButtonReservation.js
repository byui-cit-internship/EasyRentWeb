import React, {useState, TouchableOpacity, useEffect} from 'react';
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
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Select from 'react-select'

import Button from 'react-bootstrap/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import Footer from './Footer';
import Footer2 from './Footer2';

import Divider from '@material-ui/core/Divider';
import ReservationList from './ReservationList';

const ButtonReservation = () => (
    <div>
         <Button  variant="contained"  onClick={() => { 
        setReservation(item);
        // setChecked(populateChecked(item));
        setModalShow(true);
        
        console.log(JSON.stringify(item))
        }}
        
      >
        Return Items
      </Button>
    
    </div>
  );
export default ButtonReservation;