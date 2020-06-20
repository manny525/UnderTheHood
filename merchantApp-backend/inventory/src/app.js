const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const itemRouter = require('./routers/item')
const inventoryRouter = require('./routers/inventory')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(itemRouter)
app.use(inventoryRouter)

module.exports = app