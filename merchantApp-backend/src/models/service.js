const mongoose = require('mongoose')


const serviceSchema = new mongoose.Schema({
    merchant:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        ref:'User'
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        // ref:''
    },
    date:{
        type:Date,
        required:true,
        trim:true,
    },
    detail:{
        type:String,
        trim:true
    }
})
const service = mongoose.model('service',serviceSchema)
module.exports = service