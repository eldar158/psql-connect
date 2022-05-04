const express = require('express')
const bodyParser = require('body-parser')
const app = express()


// use environment variables using dotenv
require('dotenv').config();
const PORT = process.env.PORT
const {DB_USER, DB_PASS} = {...process.env}