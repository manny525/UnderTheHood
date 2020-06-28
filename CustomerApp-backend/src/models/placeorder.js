const mongoose = require('mongoose')
const Inventory = require('./inventory')

const placeorderSchema = new mongoose.Schema({
    merchantID: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        ref:'User'
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
        type: String,
        default: 'pending'
    },
    orderItems: [
        {
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
                type: Number,
                required: true
            }
        }
    ]
})

const PlaceOrder = mongoose.model('PlaceOrder', placeorderSchema)

module.exports = PlaceOrder