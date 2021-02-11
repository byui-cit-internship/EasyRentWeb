import React, {useState, useEffect} from 'react';
import { StyleSheet, Switch, Text, Alert, TouchableHighlight, Modal, View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Logo from './components/Logo';
import MyComponent from './components/HeaderTitle';

import moment from 'moment';
import { useFonts } from 'expo-font';

import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import { TouchableOpacity } from 'react-native-gesture-handler';


const EasyRentURL = "https://easyrent-api-test.cit362.com/reservations"; 
const App =  ()  =>  {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [date, setDate] = useState(moment());
  const [modalVisible, setModalVisible] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [reservationId, setReservationId] = useState("");
  const [reservationItems, setReservationItems] = useState([]);
  const [reservation, setReservation] = useState({});
  
  toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    setSwitchValue(value);
    //state changes according to switch
    //which will result in re-render the text
  };

  useEffect(() => {
    fetch(EasyRentURL)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => alert(error)) 
      .finally(() => setLoading(false));
  }, []);


  return (
    
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator/> 
      ) : (
      <View> 
        
      <MyComponent/> 
      
      
      <View style={styles.container}>
        <Text style={styles.title}>
          Due Date Reservations
        </Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2090"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
              
            },
            dateInput: {
              marginLeft: 36,
            },
          }}      
          onDateChange={(date) => {
            setDate(date);
          }}
        />
        
        <FlatList 
            data={data} 
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              
              <View style={styles.containerOne}>
                <TouchableOpacity 
                  style={styles.listButton}
                  onPress={() => {
                    setReservationId(item.reservationId);
                    setReservationItems(item.reservationItems);
                    setModalVisible(true);
                    setReservation(item);
                    
                  }}>
                <Text style={styles.titleOne}>
                  {item.reservationId}. {item.customerId}
                </Text>
                </TouchableOpacity>
                
              </View>
            )}
            
          />
          

        <Text style={styles.title}>{title}</Text>
        
          <View style={{borderBottomWidth: 0, marginBottom: -5, marginTop: 10}}></View>
          
          <View style={styles.centeredView}>
            
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.title}></Text>
                  

                  <FlatList 
                    data={[reservation]}
                    keyExtractor={({ id }, index) => id}
                    renderItem  ={({ item }) => (
                      
                      <View style={styles.containerOne}>
                        <TouchableOpacity 
                        
                          style={styles.listButton}
                          onPress={() => {
                            
                            setModalVisible(true);
                          }}>

                        

                        <FlatList
                        data={reservationItems}
                        renderItem={({ item }) => <Text style={{color: '#FFFFFF', fontSize: 18}}>

                      <View style={styles.containerSwitch}>
                  
                        <Switch
                          style={{ marginTop: 30 }}
                          onValueChange={toggleSwitch}
                          value={item.reservationItems}
                          
                        />
                        
                      </View>{item.description}</Text>}
                        style={styles.textStyle}
                        keyExtractor={item => item._id}
                        
                      />
                        </TouchableOpacity>
                        
                      </View>
                      
                    )}
                    
                  />

                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: '#38BE7D' }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>Return</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{ ...styles.closeButton, backgroundColor: '#f94c57' }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableHighlight>
                 
      
      

                  
                </View>
              </View>
              
            </Modal>
            
          </View>
          
         
      </View>
     
      </View> 
      
      )}
   
    </SafeAreaView>
    
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -130
    
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 1,
    marginTop: 1,
    marginBottom: 1,
   
  },
  datePickerStyle: {
    width: 230,
    marginTop: 1,
    left: 0,
    fontSize: 30,
    textAlign: 'center',
    
  },
  card:{
    borderStartColor: '#fff',
    marginBottom: 2,
    marginLeft: '2%',
    width: '100%',
    shadowColor: '#000',
    shadowRadius: 1,
    shadowOffset:{
      width: 10,
      height:3
    }
  },
  containerOne:{
    marginTop: 15,
    paddingTop:15,
    paddingBottom: 20,
    marginLeft:0,
    marginRight:0,
    backgroundColor:'#006EB6',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    alignContent: 'center',
    width: '97%',
    
  },
  titleOne: {
    textAlign: 'center',
    padding: 1,
    marginTop: 10,
    color: 'white'
   
  },
  titleDate: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 1,
    marginTop: 10,
    marginBottom: 1,

   
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    marginBottom: 50,
  },
  centeredViewPopUp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 300,
  },
  modalView: {
    marginTop: 10,
    marginBottom: 250,
    backgroundColor: '#E7E4E4',
    borderRadius: 15,
    padding: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 60,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  modalText: {
    marginBottom: 1,
    textAlign: 'center',
    bottom: 99,
    fontSize: 16,
    
    
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    bottom: -21,
    left: '15%',
    width: 100
    
  },
  closeButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    bottom: 15,
    right: '15%',
    width: 100,
  },
  listButton:{
    borderStartColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%',
    width: 390,
    shadowColor: '#000',
    shadowRadius: 1,
    shadowOffset:{
      width: 10,
      height:3
    }
  },
 
  
});