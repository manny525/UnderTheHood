const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    item: {
        type: String,
        required: true,
        trim: true,
    },
    itemCategory: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item