const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries') 


// use environment variables using dotenv
require('dotenv').config();
const PORT = process.env.PORT
const {DB_USER, DB_PASS} = {...process.env}

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


app.get('/', (req, res) => res.json('server is available') )
app.get('/countries', db.getCountries)
app.get('/countries/:id', db.getCountryById)
app.post('/countries', db.createCountry)
app.put('/countries/:id', db.updateCountry)
app.delete('/countries/:id', db.deleteCountry)

app.listen(PORT , () => {
    console.log(`listening on port ${PORT}`)
})
