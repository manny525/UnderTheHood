// require('./../db/mongoose')
var cart = require("./../models/cart");
const auth = require("./../middleware/auth");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = new express.Router();
app.use(urlencodedParser);
app.use(bodyParser.json());

// cart.findOne({ _id: previousCartID }).then((result) => {
//     if (!result) {
//         currentCart = result;
//         console.log("uns");
//     }
// });

//when a customer visits a merchant. the frontend should return custId and merchantId.
app.post("/merchant", auth, urlencodedParser, (req, res) => {
    var cartID = req.body.merchantID + req.user._id;
    cart.findOne({ _id: cartID }).then((result) => {
        if (result) {
            console.log(result);
            var currentCart = result;
        } else {
            console.log(req.body);
            var currentCart = new cart({ _id: req.body.id });
            currentCart
                .save()
                .then((result) => {
                    console.log("new Cart added");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        res.json(currentCart);
    });
});

//when the cart is chosen. send them the currentCart with all the details with it
//req.body contains -{id:""}      This the cartID
app.post("/User/cart", auth, urlencodedParser, (req, res) => {
    cart.findOne({ _id: req.body.id })
        .then((currentCart) => {
            res.json(currentCart);
        })
        .catch((err) => {
            console.log(err);
        });
});

//when customer goes to a merchant and adds an item. the req.body containg the id of the item and the quantity
//req.body contain { cartID:""}, item:{id:""}
//req.body should be {id:"",quantity:Number} id should be inventory id
app.post("/merchant/add", auth, urlencodedParser, async (req, res) => {
    try {
        var cartID = req.body.merchantID.toString() + req.user._id.toString();
        var currentCart = await cart.findById(cartID);
        console.log("current cart ", currentCart);
        currentCart.addItem(req.body.item, currentCart);
        res.status(201).send("201 success");
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

//when the cart is chosen and the customer decides to update an item
//the req.body should be {id:"", quantity:Number} id should be inventory id
app.post("/User/cart/update", auth, urlencodedParser, async (req, res) => {
    try {
        var cartID = req.body.merchantID.toString() + req.user._id.toString();
        const currentCart = await cart.findOne({ _id: cartID });
        currentCart.updateItem(req.body.item, cart);
        res.status(201).send("201 succes");
    } catch (err) {
        res.status(500).send("error,", err);
    }
});

//to delete or reduce the number of items. If user desires to delete the entire item
//send req.quantity = the magnitude of the quantity present in the cart
//req.body contain { merchantID:""}, item:{id:""}
app.post("/User/cart/delete", auth, urlencodedParser, async (req, res) => {
    try {
        const cartID = req.body.merchantID.toString() + req.user._id.toString();
        const currnetCart = await cart.findOne({ _id: cartId });
        currentCart.reduceItem(req.body, currentCart);
        res.status("201").send("item deleted");
    } catch (err) {
        res.status(500).send("Error", err);
    }
});

//to empty a cart after checkOut or when a customer wants to delete it
app.post("/User/cart/empty", auth, urlencodedParser, async (req, res) => {
    try {
        var cartID = req.body.merchantID.toString() + req.user._id.toString();
        var currentCart = await cart.findOne({ _cartID });
        currentCart.emptyIt(cart);
        currentCart = new cart({ _id: cartID });
        res.status(201).send("success");
    } catch (err) {
        res.status(400).send("No cart:", err);
    }
});
