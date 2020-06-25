const express = require('express')
require('./db/mongoose')
const visaRouter = require('./routers/visa')
const app = express()

app.use(express.json())
app.use(visaRouter)

module.exports = app