const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    category: {
        categoryName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        items: [{
            item: {
                type: String,
                required: true,
                trim: true,
                unique: true
            },
            mrp: {
                type: Number,
                required: true
            }
        }]
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item