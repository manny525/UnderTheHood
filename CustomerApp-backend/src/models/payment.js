const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Customer',
    },
    merchantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    otp:{
        type:String,
        trim:true,
    },
    transactionIdentifier:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        trim:true,
        required:true,
    },
    senderAccountNumber:{
        type:String,
        trim:true,
    },
    status:{
        type:String,
        default:'Pending',
        trim:true,
    }
})

const payment = mongoose.model('payment',paymentSchema)

module.exports = payment