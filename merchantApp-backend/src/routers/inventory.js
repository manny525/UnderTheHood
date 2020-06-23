const express = require('express')
const Inventory = require('../models/inventory')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/inventory/new', auth, async (req, res) => {
    const inventory = new Inventory({
        ...req.body,
        owner: req.user._id
    })
    try {
        await inventory.save()
        res.status(201).send(inventory)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/inventory', auth ,async (req, res) => {
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

router.patch('/inventory/addItem', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['item']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    
    const {itemId, itemName, available, categoryId, sellingPrice, owner} = req.body.item
    
    if (!isValidUpdate) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        const inventory = await Inventory.findOne({ owner })
        if (!inventory) {
            return res.status(404).send()
        }
        inventory.categories.forEach(category => {
            if (category.categoryId === categoryId) {
                category.items.push({itemId, itemName, available, sellingPrice})
            }
        })
        await inventory.save()
        res.send(inventory)
    } catch(e) {
        res.status(400).send()
    }
})

router.patch('/inventory/updateItem', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['item']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    
    const {itemId, itemName, available, categoryId, sellingPrice, owner} = req.body.item

    const updatedItem = {
        itemId, itemName, available, sellingPrice
    }
    
    if (!isValidUpdate) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        const inventory = await Inventory.findOne({ owner })
        if (!inventory) {
            return res.status(404).send()
        }
        inventory.categories.forEach((category) => {
            if (category.categoryId === categoryId) {
                category.items.forEach((item, i) => {
                    console.log(category.items[i])
                    if (item.itemId === itemId) {
                        category.items[i] = updatedItem
                    }
                })
            }
        })
        await inventory.save()
        res.send(inventory)
    } catch(e) {
        res.status(400).send()
    }
})

router.patch('/inventory/deleteItem', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['item']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    
    const {itemId, categoryId, owner} = req.body.item
    
    if (!isValidUpdate) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        const inventory = await Inventory.findOne({ owner })
        if (!inventory) {
            return res.status(404).send()
        }
        inventory.categories.forEach((category) => {
            if (category.categoryId === categoryId) {
                category.items.forEach((item, i) => {
                    console.log(category.items[i])
                    if (item.itemId === itemId) {
                        category.items.splice(i, 1)
                    }
                })
            }
        })
        await inventory.save()
        res.send(inventory)
    } catch(e) {
        res.status(400).send()
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