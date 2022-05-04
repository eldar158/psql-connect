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
        if (err) {
            throw err
        }
        return res.status(200).json(results.rows)
    })
}

module.exports = {
    getCountries
}