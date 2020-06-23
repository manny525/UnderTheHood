const express=require('express')
const router= new express.Router()
const Cards= require('./../models/card')
const auth=require('./../middleware/auth')
const cardvalidator = require('./../middleware/card_validation/card')
require('./../db/mongoose')

router.post('/add/card',[auth,cardvalidator],async(req,res)=>{
    try{
        const card = new Cards({
            ...req.body,
            owner:req.user._id
        })
        await card.save()
        res.send(req.card)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/cards',auth,async(req,res)=>{
    try{
        await req.user.populate({
            path:'Cards',
        }).execPopulate()
        res.send(req.user.Cards)
    }catch(e){
        res.status(400).send('error:e')
    }
})


router.delete('/delete/card',auth,async(req,res)=>{
    try{
        const card = await Cards.findOneAndRemove({owner:req.user._id,number:req.body.number})
        if(!card){
            throw new Error()
        }
        res.send()
    }catch(e){
        res.status(400).send(e)
    }
})
module.exports = router