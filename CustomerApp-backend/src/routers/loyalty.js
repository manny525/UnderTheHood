const express = require('express')
const Loyalty = require('./../models/loyalty')
require('./../db/mongoose')
const router = new express.Router()
const auth = require('./../middleware/auth')

router.post('/add/loyalty',auth,async(req,res)=>{
    try{
        const loyalty = new Loyalty({
            ...req.body,
            customer:req.user._id
        })
        await loyalty.save()
        res.send()
    }catch(error){
        res.status(400).send({error})
    }
})

router.get('/loyalty',auth,async(req,res)=>{
    try{
        await req.user.populate({
            path:'Loyalty',
        }).execPopulate()
        res.send(req.user.Loyalty)
    }catch(error){
        res.status(400).send({error})
    }
})

router.patch('/loyalty',auth,async(req,res)=>{
    try{
        const loyalty = await Loyalty.findOneAndUpdate({customer:req.user._id},points=req.body.points)
        res.send(loyalty)
    }catch(e){
        res.status(400).send({error})
    }
})
module.exports = router