import React, { useState, useEffect } from 'react';
import Text from 'react-text';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function MyVerticallyCenteredModal(props) {
  const getCheckboxes = (reservationItems) => reservationItems.reduce(
      (checkboxes, { uniqueItemId, returned, recorded }) => {
          // checkboxes[uniqueItemId] = toggle === 'returned' ? returned : recorded;
          checkboxes[uniqueItemId] = returned;
          return checkboxes;
      }, {}
  );
  
  const { toggle } = props;
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
       // toggle // returned, recorded
        // item[toggle] = checkboxState[index];
        const state = checkboxState[index];
        if (toggle === 'recorded') {
          item.recorded = state;
        } 
          item.returned = state;
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
          {toggle === 'returned' ? 'Rented' : 'Returned'} Items
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div >
            <div>
              <FormControlLabel
                control={toggle === 'recorded' ?
                <Checkbox 
                  color="secondary"
                  onChange={onCheckAll} 
                  checked={checkedAll} /> : 
                <GreenCheckbox 
                  onChange={onCheckAll} 
                  checked={checkedAll}/>
                }
                  label="Check / Uncheck All"
              />
              <Divider />
            </div>

            {
              props.reservationItems.map(item => (
                <div>
                  <FormControlLabel
                    control={toggle === 'recorded' ?  
                    <Checkbox
                        color="secondary" 
                        checked={checkboxState[item.uniqueItemId]}
                        name={item.uniqueItemId}
                        onChange={handleChange}
                      /> : <GreenCheckbox 
                        checked={checkboxState[item.uniqueItemId]}
                        name={item.uniqueItemId}
                        onChange={handleChange}/>
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
              style={toggle === 'returned' ? { width: '90px', backgroundColor: "#80C140", color: "white" } : { width: '90px', backgroundColor: "#E95056", color: "white" }}
              onClick={submitAndClose}>
              {toggle === 'returned'
                ? <Text>Return</Text>
                : <Text>Record</Text>
              }
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }