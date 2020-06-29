const Service = require('./../models/service')
const auth = require('./../middleware/auth_customer')
const express = require('express')
const router = new express.Router()
// const moment = require('moment')

router.post('/services/new', auth ,async(req,res)=>{
    try{
        const service = new Service({
            ...req.body,
            customerName: req.user.name,
            customerId: req.user._id
        })
        await service.save() 
        console.log(service)
        res.send(service)     
    }catch(error){
        res.status(400).send({error})
    }
})

router.get('/services/customer', auth, async(req,res)=>{
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

//to be discussed and changes
router.patch('/services/date/:id',auth,async(req,res)=>{
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

router.patch('/service/status', auth, async (req, res) => {
    try {
        const service = await Service.findOne({_id: req.body._id})
        if (!order) {
            res.status(404).send({message: 'Not found'})
        }
        service.status = req.body.status
        await service.save()
        res.send(service)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/services/delete',async(req,res)=>{
    try{
        await Service.findOneAndRemove(req.body)
        res.send()
    }catch(error){
        res.status(400).send({error})
    }
})


module.exports = router