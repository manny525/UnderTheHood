const Service = require('./../models/service')
const auth = require('./../middleware/auth')
const auth_customer = require('./../middleware/auth_customer')
const express = require('express')
const router = new express.Router()
const moment = require('moment')

router.post('/add/service',auth_customer,async(req,res)=>{
    try{
        const service = new Service({
            ...req.body,
            customer:req.user._id,
            status:'Pending'
        })
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

router.patch('/update//service',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    
    const allowedUpdates = ['time', 'status','date']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid updates' })
    }
    try {
        req.service= await Service.findOne({_id:req.query.id})
        
        updates.forEach((update) => req.service[update] = req.body[update])
        
        await req.service.save()
        res.send(req.service)
    } catch(e) {
        res.status(400).send(e)
    }
})

//id of service to dekete
router.delete('/delete/service',auth_customer,async(req,res)=>{
    try{
        await Service.findByIdAndRemove(req.query.id)
        res.send()
    }catch(error){
        res.status(400).send({error})
    }
})


module.exports = router