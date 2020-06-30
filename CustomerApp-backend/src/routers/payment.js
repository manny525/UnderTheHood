const express = require('express')
const router = new express.Router()
const { getAlias, pullFunds, pushFunds } = require('./visa')
const Payment = require('./../models/payment')
const Merchant = require('./../models/user')
const Customer = require('./../models/customer')
var randomize = require('randomatic')
const auth = require('./../middleware/auth')
require('./../db/mongoose')

router.post('/pull', async (req, res) => {
    try {
        pullFunds(
            {
                senderCardExpiryDate: req.body.senderCardExpiryDate,
                // "2015-10",
                amount: req.body.amount,
                // 124.02,
                senderPrimaryAccountNumber: req.body.senderAccountNumber,
                // 4895142232120006
            }, 
            async function (ans, e) {
                if (e) {
                    return res.status(500).send({ error: e })
                }
                try {
                    const otp = randomize('Aa0', 6);
                    const payment = new Payment({
                        ...req.body,
                        otp,
                        transactionIdentifier: ans.body.transactionIdentifier,
                    })
                    console.log(ans.body)
                    await payment.save()
                    res.send({ transactionIdentifier: ans.body.transactionIdentifier, otp })
                } catch (e) {
                    res.status(500).send({ error: e })
                }

            })
    } catch (e) {
        res.status(500).send({ error: e })
    }
})

router.post('/push', auth, async (req, res) => {
    try {
        console.log({ merchantId: req.user._id, otp: req.body.otp });
        const payment = await Payment.findOne({ merchantId: req.user._id, otp: req.body.otp })
        if (!payment) {
            return res.status(400).send({ error: 'Invalid data' })
        }
        const customer = await Customer.findById(payment.customerId)
        getAlias({ guid: '574f4b6a4c2b70472f306f300099515a789092348832455975343637a4d3170' }, (ans, e) => {
            if (e) {
                return res.status(500).send({ error: e })
            }
            pushFunds({
                recipientPrimaryAccountNumber: ans.recipientPrimaryAccountNumber,
                amount: payment.amount,
                recipientName: ans.recipientFirstName + ans.recipientMiddleName + ans.recipientLastName,
                senderAccountNumber: payment.senderAccountNumber,
                senderName: customer.name,
            }, (ans, e) => {
                if (e) {
                    return res.status(500).send({ error: e })
                }
                res.send({ success: 'payment successful' })
                payment.delete()
            })
        })
    } catch (e) {
        res.status(500).send({ error: e })
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

// getAlias({guid:'574f4b6a4c2b70472f306f300099515a789092348832455975343637a4d3170'},(res,e)=>{
//     if(e){
//         return console.log(e)
//     }
//     console.log(res)
// })


