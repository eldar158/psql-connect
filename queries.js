require('dotenv').config();

const Pool = require('pg').Pool
const pool  = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    PORT: process.env.DB_PORT,
})

const getCountries = (req, res) => {
    pool.query('select * from countries order by id asc', (err, results) => {
        if (err) throw err
        return res.status(200).json(results.rows)
    })
}

const getCountryById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('select * from countries where id = $1', [id] , (err, results) => {
        if (err) throw err
        return res.status(200).json(results.rows)
    })
}

const createCountry = (req, res) => {
    const {name, capital} = req.body
    pool.query('insert into countries (name, capital) values($1, $2)', [name, capital] , (err, results) => {
        if (err) throw err
        return res.status(200).json('new country was created')
    })
}

const updateCountry = (req, res) => {
    const id = parseInt(req.params.id)
    const {name, capital} = req.body
    pool.query('update countries set name = $1, capital = $2 where id = $3', [name, capital, id] , (err, results) => {
        if (err) throw err
        return res.status(200).json(`updated country ${id}`)
    })
}

const deleteCountry = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('delete from countries where id = $1', [id] , (err, results) => {
        if (err) throw err
        return res.status(200).json(`deleted country ${id}`)
    })
}

module.exports = {
    getCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry,
}