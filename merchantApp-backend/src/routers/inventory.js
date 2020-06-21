const express = require('express')
const Inventory = require('../models/inventory')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/inventory', async (req, res) => {
    const inventory = new Inventory({
        ...req.body
    })
    try {
        await inventory.save()
        res.status(201).send(inventory)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/inventory', async (req, res) => {
    const match = {}
    if (req.query.owner) {
        match.owner = req.query.owner === 'true'
    }
    try {
        const inventory = await Inventory.findOne({ owner: req.query.owner })
        if (!inventory) {
            return res.status(404).send()
        }
        res.send(inventory)
    } catch(e) {
        res.status(500).send()
    }
})

// router.get('/tasks/:id', auth, async (req, res) => {
//     const _id = req.params.id
//     try {
//         const task = await Task.findOne({ _id, owner: req.user._id })
//         if (!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/inventory', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['items']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        const inventory = await Inventory.findOne({ owner: req.query.owner })
        if (!inventory) {
            res.status(404).send()
        }
        req.body.items.forEach((item) => inventory.items.push(item))
        await inventory.save()
        res.send(inventory)
    } catch{e} {
        res.status(400).send(e)
    }
})

// router.delete('/items', async (req, res) => {
//     try {
//         const item = await Item.findOneAndDelete({ item: req.query.item })
//         if (!item) {
//             return res.status(404).send()
//         }
//         res.send(item)
//     } catch(e) {
//         res.status(500).send()
//     }
// })

module.exports = router