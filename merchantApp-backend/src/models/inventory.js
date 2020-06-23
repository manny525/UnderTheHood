const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
    categories: [{
        categoryId: {
            type: String, //mongoose.Schema.Types.ObjectId
            required: true,
            unique: true
        },
        items: [{
            itemId: {
                type: String, //mongoose.Schema.Types.ObjectId
                required: true
            },
            itemName: {
                type: String,
                required: true,
                trim: true
            },
            available: {
                type: Boolean,
                required: true
            },
            sellingPrice: {
                type: String,
                required: false
            }
        }]
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory