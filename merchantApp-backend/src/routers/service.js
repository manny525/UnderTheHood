const Service = require('./../models/service')
const auth = require('./../middleware/auth')
const express = require('express')
const router = new express.Router()
const moment = require('moment')

router.post('/add',async(req,res)=>{
    try{
        var service = await Service.findOne({merchant:req.body.merchant,date:new Date(req.body.date)})
        if(service){
            return res.status(400).send({message:'Merchant is not available.Try a different time.'})
        }
        service = new Service(req.body)
        await service.save() 
        res.send(service)     
    }catch(error){
        res.status(400).send({error})
    }
})

router.get('/service',auth,async(req,res)=>{
    const sort = {'date':'asc'}
    try{
        await req.user.populate({
            path:'service',
            sort
        }).execPopulate()
        res.send(req.user.service)
    }catch(error){
        res.status(400).send({error})
    }
})

router.patch('/date/:id',auth,async(req,res)=>{
    try{
        var service = await Service.findOne({merchant:req.user._id,date:new Date(req.body.date)})
        if(service){
            return res.status(400).send({message:'Merchant is not available.Try a different time.'})
        }
        await Service.findByIdAndUpdate({_id:req.params.id},{date:req.body.date})
        res.send()
    }catch(error){
        res.status(500).send({error})
    }
})

router.delete('/delete',async(req,res)=>{
    try{
        await Service.findOneAndRemove(req.body)
        res.send()
    }catch(error){
        res.status(400).send({error})
    }
})


module.exports = router