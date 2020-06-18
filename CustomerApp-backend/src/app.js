const express=require('express')
require('./db/mongoose')

const app=express()

app.use(express.json())
app.use(require('./routers/user'))


module.exports=app

