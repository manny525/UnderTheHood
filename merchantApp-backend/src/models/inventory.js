const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
    owner: {
        type: String, //mongoose.Schema.Types.ObjectId,
        required: true,
    },
    items: [{
            itemId: {
                type: String,
                required: true
            },
            available: {
                type: Boolean,
                required: true
            }
        }]
})

const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory