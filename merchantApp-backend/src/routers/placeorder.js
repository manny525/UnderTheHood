const express = require('express')
const PlaceOrder = require('../models/placeorder')
const User = require('../models/user')
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
    const match = {}
    if (req.query.order) {
        match.order = req.query.order === 'true'
    }
    try {
        const order = await Order.findOne({ o: req.query.order })
        if (!o) {
            return res.status(404).send()
        }
        res.send(order)
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
        const placeorder = await PlaceOrder.findOne({ p: req.order })
        if (!p) {
            res.status(404).send()
        }
        updates.forEach((update) => placeorder[update] = "approved")
        await placeorder.save()
        res.send(placeorder)
    } catch{e} {
        res.status(400).send(e)
    }
})
