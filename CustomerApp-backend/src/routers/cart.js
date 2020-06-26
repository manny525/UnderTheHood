require("./../db/mongoose");
var cart = require("./../models/cart");
const auth = require("./../middleware/auth");
var express = require("express");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = new express.Router();
router.use(urlencodedParser);
router.use(bodyParser.json());

//when a customer visits a merchant. the frontend should return custId and merchantId.
router.post("/merchant", [auth, urlencodedParser], async (req, res) => {
    try {
        var cartID = req.body.merchantID.toString() + req.user._id.toString();
        var currentCart = await cart.findOne({ _id: cartID });
        if (currentCart) {
            res.status(201).json(currentCart);
        } else {
            currentCart = new cart({ _id: cartID });
            await currentCart.save();
        }
        res.status(201).json(currentCart);
    } catch (e) {
        res.status(500).send("Internal Error");
    }
});

//when the cart is chosen. send them the currentCart with all the details with it
//req.body contains -{merchantID:""} //he id should be the merchantID
router.get("/user/cart", [auth, urlencodedParser], async (req, res) => {
    try {
        var cartID = req.body.merchantID.toString() + req.user._id.toString();
        var currentCart = await cart.findOne({ _id: cartID });
        if (currentCart) res.status(200).json(currentCart);
        else res.status(400).send("Invalid Parameters");
    } catch (err) {
        res.status(500).send("Internal Error");
    }
});

//when customer goes to a merchant and adds an item. the req.body containg the id of the item and the quantity
//req.body should be {item:{item_id:"",quantity:Number}} id should be inventory id
router.patch("/merchant/add", [auth, urlencodedParser], async (req, res) => {
    try {
        var cartID = req.body.merchantID.toString() + req.user._id.toString();
        var currentCart = await cart.findById(cartID);
        if (!currentCart) {
            currentCart = new cart({ _id: cartID });
            await currentCart.save();
        }

        await currentCart.addItem(req.body.item, currentCart);
        res.status(201).send();
    } catch (err) {
        res.status(500).send({ error: err });
    }
});

//when the cart is chosen and the customer decides to update an item
//the req.body should be item:{item_id:"", quantity:Number}, merchantID id should be inventory id
router.patch("/user/cart/update", [auth, urlencodedParser], async (req, res) => {
    try {
        var cartID = req.body.merchantID.toString() + req.user._id.toString();
        const currentCart = await cart.findOne({ _id: cartID });
        await currentCart.updateItem(req.body.item, currentCart);
        res.status(201).send("Cart Updated");
    } catch (err) {
        res.status(400).send("error");
    }
});

//to delete or reduce the number of items. If user desires to delete the entire item
//send req.quantity = the magnitude of the quantity present in the cart
//req.body contain { merchantID:""}, item:{id:""}
router.delete("/user/cart/delete", [auth, urlencodedParser], async (req, res) => {
    try {
        var cartID = req.body.merchantID.toString() + req.user._id.toString();
        var currentCart = await cart.findOne({ _id: cartID });
        await currentCart.reduceItem(req.body.item, currentCart);
        res.status(201).send("item deleted");
    } catch (err) {
        res.status(400).send(err);
    }
});

//to empty a cart after checkOut or when a customer wants to delete it
router.delete("/user/cart/empty", [auth, urlencodedParser], async (req, res) => {
    try {
        var cartID = req.body.merchantID.toString() + req.user._id.toString();
        var currentCart = await cart.findOne({ _id: cartID });
        console.log("check1");
        if (currentCart) {
            await currentCart.emptyIt(currentCart);
            currentCart = new cart({ _id: cartID });
            await currentCart.save();
            res.status(201).send("success");
        } else res.status(400).send("Invalid Parameters");
    } catch (err) {
        res.status(500).send("Internal Error");
    }
});

module.exports = router;
