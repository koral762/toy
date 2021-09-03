const express = require('express')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const cors = require('cors')
const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000']
}
const toyService = require('./service/toy.service')

const app = express()
const PORT = '3030'

// toyService.query().then(res => console.log ('res',res))

// Config express app
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(session({
    secret: 'some secret string',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

app.get('/api/test', (req, res) => res.send('Hello there mr test!'))

// List **** 

app.get('/api/toy', (req, res) => {
    const filterBy = req.query

    toyService.query(filterBy)
        .then(toys => {
            // console.log ('res',toys)
            res.send(toys)
        })
})
// Creat ****
app.post('/api/toy', (req, res) => {
    const toy = req.body;
    console.log('toy =', toy)
    toyService.save(toy)
        .then(savedToy => {
            console.log('savedToy =', savedToy)
            res.send(savedToy)
        })
})
// Update ****
app.put('/api/toy/:toyId', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then(savedToy => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Backend Error: ', err);
            res.status(402).send('Pay First!')
        })
})
// Read ****

app.get('/api/toy/:carId', (req, res) => {
    const {
        carId: toyId
    } = req.params
    toyService.getById(toyId)
        .then(toy => {
            res.send(toy)
        })
})

// remove ****

app.delete('/api/toy/:toyId', (req, res) => {
    const {
        toyId
    } = req.params
    toyService.remove(toyId, )
        .then(() => {
            res.send()
        })
        .catch(err => {
            console.log('Cannot delete car', err);
            res.status(401).send(err)
        })
})

app.listen(PORT,
    () => console.log(`Server listening on port ${PORT}`)
)