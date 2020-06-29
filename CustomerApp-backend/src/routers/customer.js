const User = require('../models/customer')
const auth = require('../middleware/auth_customer')
const check = require('../middleware/number_verification/number')
const { sendVerificationCode } = require('../emails/account')
const { items } = require('../models/cart')
const express = require('express')
const router = new express.Router()

router.post('/customer/verifyEmail', async (req, res) => {
    try {
        const vCode = await sendVerificationCode(req.body.email)
        res.status(201).send({ vCode })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/customer/register', check, async (req, res) => {
    const user = new User(req.body)
    try {
        console.log('user saved')
        const token = await user.generateAuthToken()
        console.log(token)
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/customer/findUser', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = await user.generateAuthToken()
            console.log(token)
            return res.send({ user, token, existingUser: true })
        }
        return res.status(404).send({ existingUser: false })
    } catch (e) {
        res.send(e)
    }
})

router.post('/customer/login', async (req, res) => {
    try {
        const user = await User.findUser(req.body.email)
        const token = await user.generateAuthToken()
        await user.populate({
            path: 'Loyalty',
        }).execPopulate()
        await user.populate({
            path: 'Cards',
        }).execPopulate()
        await user.populate({
            path: 'carts',
        }).execPopulate()
        await user.populate({
            path: 'Order',
        }).execPopulate()
        await user.populate({
            path: 'Service',
        }).execPopulate()
        for (var i = 0; i < user.carts.length; i++) {
            for (var j = 0; j < user.carts[i].items.length; j++) {
                const item = await items.findById(user.carts[i].items[j])
                user.carts[i].items[j] = item
            }
        }
        res.send({
            user,
            loyalty: user.Loyalty,
            cards: user.Cards,
            carts: user.carts,
            orders: user.Order,
            service: user.Service,
            token,
            existingUser: true
        })
    } catch (error) {
        res.status(400).send({ error })
    }
})

router.post('/customer/loginByToken', auth, async (req, res) => {
    try {
        const user = req.user
        await user.populate({
            path: 'Loyalty',
        }).execPopulate()
        await user.populate({
            path: 'Cards',
        }).execPopulate()
        await user.populate({
            path: 'carts',
        }).execPopulate()
        await user.populate({
            path: 'Order',
        }).execPopulate()
        await user.populate({
            path: 'Service',
        }).execPopulate()
        for (var i = 0; i < user.carts.length; i++) {
            for (var j = 0; j < user.carts[i].items.length; j++) {
                const item = await items.findById(user.carts[i].items[j])
                user.carts[i].items[j] = item
            }
        }
        res.send({
            user,
            loyalty: user.Loyalty,
            cards: user.Cards,
            carts: user.carts,
            orders: user.Order,
            service: user.Service,
            token: req.header('Authorization').replace('Bearer ', '')
        })
    } catch (error) {
        res.status(400).send({ error })
    }
})

router.post('/customer/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tk) => {
            return tk.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//Update User Info
router.patch('/customer/me', auth, async (req, res) => {
    const allow = ['name']
    const up = Object.keys(req.body)
    const isValid = up.every((up) => {
        return allow.includes(up)
    })
    if (isValid === false) {
        return res.status(400).send({ error: 'invalid updates' })
    }
    try {
        up.forEach((up) => {
            req.user[up] = req.body[up]
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})


//Get User Profie Info
router.get('/customer/me', auth, async (req, res) => {
    res.send(req.user)
})

//Delete User Account
router.delete('/customer/me', auth, async (req, res) => {
    const _id = req.user._id
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router