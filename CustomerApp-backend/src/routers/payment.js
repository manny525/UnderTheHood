const express = require('express')
const router = new express.Router()
const {getAlias,pullFunds,pushFunds} = require('./visa')
const Payment = require('./../models/payment')
const Merchant = require('./../models/user')
const Customer = require('./../models/customer')
var randomize = require('randomatic')
require('./../db/mongoose')

router.post('/pull',async(req,res)=>{
    try{
        pullFunds(
            {
                senderCardExpiryDate:req.senderCardExpiryDate,
                // "2015-10",
                amount:req.amount,
                // 124.02,
                senderPrimaryAccountNumber:req.senderPrimaryAccountNumber,
                // 4895142232120006
            }
            ,function(res,e){
                if(e){
                    return res.status(500).send({error:e})
                }
                const otp = randomize('Aa0',6);
                const payment = new Payment({
                    ...req.body,
                    otp,
                    transactionIdentifier:res.body.transactionIdentifier,
                    amount:req.amount,
                    senderAccountNumber:req.senderPrimaryAccountNumber,
                })
                await payment.save()
                res.send({transactionIdentifier:res.body.transactionIdentifier,otp})
            })
    }catch(e){
        res.status(500).send({error:e})
    }
})

router.post('/push',auth,async(req,res)=>{
    try{
        const payment = await Payment.findOne({merchantId:req.body.merchantId,otp:req.body.otp})
        if(!payment){
            return res.status(400).send({error:'Invalid data'})
        }
        const user = await Merchant.findById(req.body.merchantId)
        if(!user){
            return res.status(400).send({error:'Invalid merchant Id'})
        }
        const customer = await Customer.findById(payment.customerId)
        getAlias({guid:user.email},(res,e)=>{
            if(e){
                return res.status(500).send({error:e})
            }
            pushFunds({
                recipientPrimaryAccountNumber: req.recipientPrimaryAccountNumber,
                amount:payment.amount, 
                recipientName:user.merchantName,
                senderAccountNumber:payment.senderAccountNumber,
                senderName:customer.name,
            },(res,e)=>{
                if(e){
                    return res.status(500).send({error:e})
                }
                res.send({success:'payment successful'})
                payment.delete()
            })
        })
    }catch(e){
        res.status(500).send({error:e})
    }
})
module.exports = router

// pullFunds(
//     {
//         "senderCardExpiryDate":"2015-10",
//         "amount":124.02,
//         "senderPrimaryAccountNumber":4895142232120006
//     }
//     ,(res,e)=>{
//         if(e){
//             return console.log(e)
//         }

//         console.log(res.body)
//     })

// getAlias({guid:'2e126c28f09c76ed17944660f8bf593c1663909ac0291e4249d99372a71a0143'},(res,e)=>{
//     if(e){
//         return console.log(e)
//     }
//     console.log(res.body)
// })


