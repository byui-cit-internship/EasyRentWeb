const express = require('express')
const app = express()

app.use(express.json())

// This reservationItems should be an actual reservation...
let reservationItems = [1,2,3,4,5]
const reservations = 
    {
        customerId: "test@test335.com",
        reservationItems: reservationItems,
        dueDate: 1617730620000
    }

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.get('api/reservations', (req, res) => {
    res.send([reservations])
})

app.post('/api/reservations', (req, res) => {
    const reservation = {
        customerId: "test@test335.com",
        reservationItems: reservationItems,
        dueDate: 1617730620000
    }
    reservations.push(reservation)
    res.send(reservation)
})


app.get('/api/reservations/:id', (req, res) => {
    const reservation = reservations.find(c => c.customerId === (req.params.id))
    if (!reservation) res.status(404).send('That reservation was not found!')
    res.send(reservation)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))