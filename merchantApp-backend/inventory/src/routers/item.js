const express = require('express')
const Item = require('../models/item')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/items', async (req, res) => {
    const item = new Item({
        ...req.body
    })
    try {
        await item.save()
        res.status(201).send(item)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/items', async (req, res) => {
    const match = {}
    if (req.query.item) {
        match.item = req.query.item === 'true'
    }
    try {
        const item = await Item.findOne({ item: req.query.item })
        if (!item) {
            return res.status(404).send()
        }
        res.send(item)
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

router.patch('/items', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['mrp']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        const item = await Item.findOne({ item: req.item })
        if (!item) {
            res.status(404).send()
        }
        updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        res.send(item)
    } catch{e} {
        res.status(400).send(e)
    }
})

router.delete('/items', async (req, res) => {
    try {
        const item = await Item.findOneAndDelete({ item: req.query.item })
        if (!item) {
            return res.status(404).send()
        }
        res.send(item)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router