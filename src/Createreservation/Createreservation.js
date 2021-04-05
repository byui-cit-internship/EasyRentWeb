import React, { Component } from 'react';
import './Createreservation.css'
import Paddle from '../Paddle.jpg'
import LifeJacket from '../LifeJacket.jpg'
import Canoe from '../Canoe.jpg'




class Createreservation extends Component{
    render(){
        return(
            <div className='main-content'>
                <h1 className="reserve-header">Reserve Equipment</h1>
                <div className="Paddle">
                    <img src={ Paddle } alt="Paddle"/>
                    <div className="Paddle-amount">
                        <select id="Paddle">
                            <option value="0">Select Amount</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
                <div className="LifeJacket">
                    <img src={LifeJacket} alt="Life Jacket"/>
                    <div className="LifeJacket-amount">
                        <select id="LifeJacket">
                            <option value="0">Select Amount</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
                <div className="Canoe">
                    <img src={Canoe} alt="Canoe"/>
                    <div className="Canoe-amount">
                        <select id="Canoe">
                            <option value="0">Select Amount</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <button className="submit-button" onClick={getValues}>Rent Equipment</button>
            </div>
            
        )
    }
}

function getValues(){
let getPaddleAmount = document.getElementById('Paddle')
let PaddleAmount = getPaddleAmount.value
let getLifeJacketAmount = document.getElementById('LifeJacket')
let LifeJacketAmount = getLifeJacketAmount.value
let getCanoeAmount = document.getElementById('Canoe')
let CanoeAmount = getCanoeAmount.value

let reservationItems = []
// Paddles
for(let amount = 0; amount < PaddleAmount; amount++){
    let item = {description: "Paddle",
                itemId: 4949491,
                returned: false,
                recorded: false
                }
    reservationItems.push(item)
}
// Life Jackets
for(let amount = 0; amount < LifeJacketAmount; amount++){
    let item = {description: "LifeJacket",
                itemId: 4949488,
                returned: false,
                recorded: false
                }
    reservationItems.push(item)
}
// Canoes
for(let amount = 0; amount < CanoeAmount; amount++){
    let item = {description: "Canoe",
                itemId: 4949489,
                returned: false,
                recorded: false
                }
    reservationItems.push(item)
}
console.log(reservationItems)



    const reservation = {
        customerId: "test@test335.com",
        reservationItems: reservationItems,
        dueDate: 1617730620000
    }
    fetch("https://easyrent-api-dev.cit362.com/reservations", {
        method:'POST',
        body: JSON.stringify(reservation)
    }).then(res => {
        console.log("Request Complete! Response: ", res)
    })
}

export default Createreservation