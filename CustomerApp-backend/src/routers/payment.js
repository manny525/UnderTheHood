const express = require('express')
const router = new express.Router()
const {pullFunds,pushFunds} = require('./visa')
const Payment = require('./../models/payment')
const Merchant = require('./../models/user')
const Customer = require('./../models/customer')
var randomize = require('randomatic')
const auth = require('./../middleware/auth')
require('./../db/mongoose')
const resolve = require('./../../visa_direct/visa_alias_directory_api/test/Resolve_test')

router.post('/pull',async(req,res)=>{
    try{
        pullFunds(
            {
                senderCardExpiryDate:req.body.senderCardExpiryDate,
                // "2015-10",
                amount:req.body.amount,
                // 124.02,
                senderPrimaryAccountNumber:req.body.senderAccountNumber,
                // 4895142232120006
            }
            ,async function(ans,e){
                if(e){
                    return res.status(500).send({error:e})
                }
                try{
                    var otp = randomize('Aa0',6);
                    var data = await Payment.findOne({otp,merchantId:req.body.merchantId})
                    while(data){
                        otp = randomize('Aa0',6)
                        data = Payment.findOne({otp,merchantId:req.body.merchantId})
                    }
                    const payment = new Payment({
                        ...req.body,
                        otp,
                        transactionIdentifier:ans.body.transactionIdentifier,
                    })
                    await payment.save()
                    res.send({transactionIdentifier:ans.body.transactionIdentifier,otp})
                }catch(e){
                    res.status(500).send({error:e})
                }
                
            })
    }catch(e){
        res.status(500).send({error:e})
    }
})

router.post('/push',auth,async(req,res)=>{
    try{
        const payment = await Payment.findOne({merchantId:req.user._id,otp:req.body.otp})
        if(!payment){
            return res.status(400).send({error:'Invalid data'})
        }
        const customer = await Customer.findById(payment.customerId)
        resolve({email:req.user.email},(ans,e)=>{
            if(e){
                return res.status(500).send({error:e})
            }
            pushFunds({
                recipientPrimaryAccountNumber:ans.body.recipientPrimaryAccountNumber,
                amount:payment.amount, 
                recipientName:ans.body.recipientName,
                senderAccountNumber:payment.senderAccountNumber,
                senderName:customer.name,
            },async(ans,e)=>{
                if(e){
                    return res.status(500).send({error:e})
                }
                try{
                    payment.status = 'completed'
                    payment.otp =undefined
                    await payment.save()
                    res.send({success:'payment successful'})
                }catch(e){
                }
            })
        })
    }catch(e){
        res.status(500).send({error:e})
    }
})
module.exports = router

