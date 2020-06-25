const express = require('express')
const PlaceOrder = require('../models/placeorder')
const User = require('../models/user')
const Item = require('../models/item')
const router = new express.Router()

router.post('/placeorder/new', auth, async (req, res) => {
    const placeorder = new PlaceOrder({
        ...req.body
    })
    try {
        await placeorder.save()
        res.status(201).send(placeorder)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/placeorder', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['status']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        var orders= new Array();
        orders = await PlaceOrder.findAll({ merchantID: req.query.merchantID })
        if (!orders) {
            return res.status(404).send()
        }
        res.send(orders)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/placeorder', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['status']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        const order = await PlaceOrder.findbyId(req.body._id)
        if (!order) {
            res.status(404).send()
        }
        updates.forEach((update) => order[update] = "completed")
        await order.save()
        res.send(order)
    } catch{e} {
        res.status(400).send(e)
    }
})

module.exports = router