const mongoose = require('mongoose')
const validator = require('validator')
const valid = require('is-my-date-valid')
const validate = valid({ format: 'DD/MM/YYYY' })

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
    //Format 'DD/MM/YYYY'
    date:{
        type:String,
        required:true,
        trim:true,
        validate(value) {
            if (!validate(value)) {
                throw new Error('Invalid Date')
            }
        }
    },
    time:{
        type:String,
        trim:true,
    },
    status:{
        type:String,
        required:true,
        trim:true
    },
    detail:{
        type:String,
        trim:true
    }
})
const service = mongoose.model('service',serviceSchema)
module.exports = service