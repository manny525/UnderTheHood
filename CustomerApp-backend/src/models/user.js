const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const  randomize = require('randomatic')
const Cards =require('./card')
const Loyalty = require('./loyalty') 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2
    },
    contact:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value,'any')){
                throw new Error('Not a Phone Number')
            }
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }
    },
    address:{
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password in password')
            }
        }
    },
    referral:{
        type:String,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
})

userSchema.virtual('Cards',{
    ref:'Cards',
    localField:'_id',
    foreignField:'owner'
})

userSchema.virtual('Loyalty',{
    ref:'Loyalty',
    localField:'_id',
    foreignField:'customer'
})

userSchema.virtual('carts',{
    ref:'carts',
    localField:'_id',
    foreignField:'custID'
})

userSchema.methods.toJSON = function(){
    const user=this
    const userobj=user.toObject()
    delete userobj.password
    delete userobj.tokens
    return userobj
}

userSchema.methods.generateToken = async function(){
    const user = this
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return  token
}

userSchema.statics.findUser = async(email,password)=>{
    const user= await User.findOne({email})
    if(!user){
        throw new Error('Invalid email')
    }
    const match=await bcrypt.compare(password,user.password)
    if(!match){
        throw new Error('Invalid Password')
    }
    return user
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    if(user.isModified('referral')){
        var referral=randomize('*',5)
        var ser= await User.findOne({referral})
        while(ser){
            referral=randomize('*',5)
            ser= await User.findOne({referral})
        }
        user.referral=referral
    }
    next()
})

userSchema.pre('remove',async function(next){
    const user = this
    await Cards.deleteMany({owner:user._id})
    await Loyalty.deleteMany({customer:user._id})
    next()
})

const User=mongoose.model('User',userSchema)
module.exports=User

