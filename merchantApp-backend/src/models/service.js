const mongoose = require('mongoose')
const { Timestamp } = require('mongodb')


const serviceSchema = new mongoose.Schema({
    merchantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    merchantName: {
        type: String,
        required: true,
        trim: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerId: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        default: 'new'
    },
    date: {
        type: String, //Date
        required: true,
        trim: true,
    },
    time: {
        type: String, //Date
        required: false,
        trim: true,
    },
    description: {
        type: String,
        trim: true
    }
})
const Service = mongoose.model('Service', serviceSchema)
module.exports = Service