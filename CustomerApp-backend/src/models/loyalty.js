const mongoose=require('mongoose')
const validator=require('validator')

const loyaltySchema = new mongoose.Schema({
    points:{
        type:Number,
        required:true,
        trim:true,
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Customer',
    },
    merchant:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        //ref:'Merchant'
    },
    promocode:{
        type:String,
        trim:true,
        default:undefined,
    }
})

const Loyalty = mongoose.model('Loyalty',loyaltySchema)

module.exports = Loyalty