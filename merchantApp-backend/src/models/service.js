const mongoose = require('mongoose')
const validator = require('validator')
const valid = require('is-my-date-valid')
const validate = valid({ format: 'DD/MM/YYYY' })

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
        validate(value) {
            if (!validate(value)) {
                throw new Error('Invalid Date')
            }
        }
    },
    time: {
        type: String, //Date
        required: false,
        trim: true,
        validate(value) {
            if (!validate(value)) {
                throw new Error('Invalid Date')
            }
        }
    },
    description: {
        type: String,
        trim: true
    }
})

const Service = mongoose.model('Service', serviceSchema)
module.exports = Service