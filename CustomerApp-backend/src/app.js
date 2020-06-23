const express=require('express')
require('./db/mongoose')

const app=express()

app.use(express.json())
app.use(require('./routers/user'))
app.use(require('./routers/card'))
app.use(require('./routers/loyalty'))


module.exports=app

