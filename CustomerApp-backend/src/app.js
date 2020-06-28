const express=require('express')
require('./db/mongoose')

const app=express()

const userRouter = require('./routers/user')
const itemRouter = require('./routers/item')
const inventoryRouter = require('./routers/inventory')

app.use(express.json())
app.use(userRouter)
app.use(itemRouter)
app.use(inventoryRouter)
app.use(require('./routers/search'))
app.use(require('./routers/service'))


app.use(require('./routers/customer'))
app.use(require('./routers/card'))
app.use(require('./routers/loyalty'))
app.use(require('./routers/cart'))


module.exports=app

