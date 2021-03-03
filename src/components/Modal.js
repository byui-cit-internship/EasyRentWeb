import React, { useState, useEffect } from 'react';
import Text from 'react-text';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';

const getCheckboxes = (reservationItems) => reservationItems.reduce(
    (checkboxes, {uniqueItemId, returned}) => {
        checkboxes[uniqueItemId] = returned;
        return checkboxes;
    }, {}
);

export default function MyVerticallyCenteredModal(props) {

    const [checkedAll, setCheckedAll] = useState(false);
    const [checkboxState, setCheckboxState] = useState(getCheckboxes(props.reservationItems))

    useEffect(() => {
        const checkboxes = getCheckboxes(props.reservationItems);
        setCheckboxState(checkboxes);
    }, [props]);

    const handleChange = (event) => {
      setCheckboxState({ ...checkboxState, [event.target.name]: event.target.checked })
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
            Rented Items
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div >
            <div>
              <FormControlLabel
                control={<Checkbox 
                color="primary" 
                onChange={onCheckAll} 
                checked={checkedAll} />}
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
              style={{ width: '90px', backgroundColor: "#80C140", color: "white" }} 
              onClick={submitAndClose}>
              <Text>Return</Text>
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }