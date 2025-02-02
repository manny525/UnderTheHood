const express = require('express')
const router = new express.Router()
const { pullFunds, pushFunds } = require('./visa')
const Payment = require('./../models/payment')
const Merchant = require('./../models/user')
const Customer = require('./../models/customer')
var randomize = require('randomatic')
const auth = require('./../middleware/auth')
require('./../db/mongoose')
const resolve = require('./../../visa_direct/visa_alias_directory_api/test/Resolve_test')
const { sendPaymentOTP } = require('../emails/account')
const User = require('./../models/user')
const Order = require('../models/order')
const Service = require('../models/service')

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
            }
            , async function (ans, e) {
                if (e) {
                    return res.status(500).send({ error: e })
                }
                try {
                    var otp = randomize('Aa0', 6);
                    var data = await Payment.findOne({ otp, merchantId: req.body.merchantId })
                    while (data) {
                        otp = randomize('Aa0', 6)
                        data = Payment.findOne({ otp, merchantId: req.body.merchantId })
                    }
                    const payment = new Payment({
                        ...req.body,
                        otp,
                        transactionIdentifier: ans.body.transactionIdentifier,
                    })
                    const customer = await Customer.findById(req.body.customerId)
                    const merchant = await User.findById(req.body.merchantId)
                    // const vCode = await sendPaymentOTP(customer.email, otp, merchant.merchantName)
                    console.log(otp)
                    const order = await Order.findById(req.body.orderId)
                    if (!order) {
                        const service = await Service.findById(req.body.orderId)
                        console.log(service || 'service not found')
                        service.status = 'completed'
                        await service.save()
                        await payment.save()
                        res.send({ transactionIdentifier: ans.body.transactionIdentifier, otp, service })
                    } else {
                        order.status = 'completed'
                        await order.save()
                        await payment.save()
                        res.send({ transactionIdentifier: ans.body.transactionIdentifier, otp, order })
                    }
                } catch (e) {
                    res.status(500).send({ error: e })
                }

            })
    } catch (e) {
        res.status(500).send({ error: e })
    }
})

router.post('/push', auth, async (req, res) => {
    console.log(req.body)
    try {
        const payment = await Payment.findOne({ merchantId: req.user._id, otp: req.body.otp })
        // console.log(payment)
        if (!payment) {
            return res.status(400).send({ error: 'Invalid data' })
        }
        const customer = await Customer.findById(payment.customerId)
        // console.log(customer)
        resolve({ email: req.user.email }, (ans, e) => {
            console.log('god knows')
            console.log(ans.body)
            console.log(payment.senderAccountNumber)
            if (e) {
                return res.status(500).send({ error: e })
            }
            pushFunds({
                recipientPrimaryAccountNumber: ans.body.recipientPrimaryAccountNumber,
                amount: payment.amount,
                recipientName: ans.body.recipientName,
                senderAccountNumber: payment.senderAccountNumber,
                senderName: customer.name,
            }, async (ans, e) => {
                if (e) {
                    console.log(e.body)
                    return res.status(500).send({ error: e })
                }
                try {
                    payment.status = 'completed'
                    payment.otp = undefined
                    await payment.save()
                    console.log('successful')
                    res.send({ success: 'payment successful' })
                } catch (e) {
                    // console.log(e)
                    res.send({error: 'failed'})
                }
            })
        })
    } catch (e) {
        res.status(500).send({ error: e })
    }
})
module.exports = router

