const User = require('./../models/user')
const auth=require('./../middleware/auth')
const check=require('../middleware/number_verification/number')
const {welcomemail} = require('../emails/account')
const  randomize = require('randomatic')
const {items} = require('./../models/cart')

const express=require('express')
const router= new express.Router()

router.post('/register/user',check,async(req,res)=>{
    const user= new User(req.body)
    try{
        await user.save()
        const otp=randomize('0',6)
        welcomemail(user.email,user.name,otp)
        const token=await user.generateToken()
        res.status(201).send({user,token,otp})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/user/login',async(req,res)=>{
    try{
        const user=await User.findUser(req.body.email,req.body.password)
        const token=await user.generateToken()
        await user.populate({
            path:'Loyalty',
        }).execPopulate()
        await user.populate({
            path:'Cards',
        }).execPopulate()
        await user.populate({
          path:'carts',  
        }).execPopulate()
        for(var i=0;i<user.carts.length;i++){
            for(var j=0;j<user.carts[i].items.length;j++){
                const item = await items.findById(user.carts[i].items[j])
                user.carts[i].items[j]= item
            }
        }
        res.send({
            user,
            Loyalty:user.Loyalty,
            Cards:user.Cards,
            Carts:user.carts,
            token
        })
    }catch(error){
        res.status(400).send({error})
    }
})

router.post('/user/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((tk)=>{
            return tk.token!==req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

//Update User Info
router.patch('/user/me',auth,async(req,res)=>{
    const allow=['name','password']
    const up=Object.keys(req.body)
    const isValid=up.every((up)=>{
        return allow.includes(up)
    })
    if(isValid===false){
        return res.status(400).send({error:'invalid updates'})
    }
    try{
        up.forEach((up)=>{
            req.user[up]=req.body[up]
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(400).send(e)
    }
})


//Get User Profie Info
router.get('/user/me',auth,async(req,res)=>{
    res.send(req.user)
})

//Delete User Account
router.delete('/user/me',auth,async (req,res)=>{
    const _id=req.user._id
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})




module.exports=router