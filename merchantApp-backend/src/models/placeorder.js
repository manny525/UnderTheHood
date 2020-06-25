const mongoose = require('mongoose')
const Inventory = require('./inventory')

const placeorderSchema = new mongoose.Schema({
    merchantID: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    customerID: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    shopName: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: 'false'
    },
    orderItems: {
        itemId: {
            type: String, //mongoose.Schema.Types.ObjectId
            required: true
        },
        itemName: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true
        },
        sp: {
            type: String,
            required: true
        }
    }
})

const PlaceOrder = mongoose.model('PlaceOrder', placeorderSchema)

module.exports = PlaceOrder