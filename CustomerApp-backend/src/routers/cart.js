// require('./../db/mongoose')
var cart = require("./../models/cart");

// const auth = require("./../middleware/auth");

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var previousCartID = "123321"; //previous cart should be fetched from cookies or cache or some database
var currentCart = undefined;

const router = new express.Router();

app.use(urlencodedParser);
app.use(bodyParser.json());

cart.findOne({ _id: previousCartID }).then((result) => {
    if (!result) {
        currentCart = result;
        console.log("uns");
    }
});

//when a customer visits a merchant. the frontend should return custId and merchantId.
//req.body should contain {id:""} which is the mrechantID + customerID
app.post("/merchant", urlencodedParser, (req, res) => {
    cart.findOne({ _id: req.body.id }).then((result) => {
        if (result) {
            console.log(result);
            currentCart = result;
        } else {
            console.log(req.body);
            currentCart = new cart({ _id: req.body.id });
            currentCart
                .save()
                .then((result) => {
                    console.log("new Cart added");
                })
                .catch((err) => {
                    console.log(err);
                });
            previousCartID = req.body.id;
        }
        res.send("succrs");
    });
});

//when the cart is chosen. send them the currentCart with all the details with it
app.post("/cart", urlencodedParser, (req, res) => {
    res.json(currentCart);
});

//when customer goes to a merchant and adds an item. the req.body containg the id of the item and the quantity
//req.body should be {id:"",quantity:Number} id should be inventory id
app.post("/merchant/add", urlencodedParser, (req, res) => {
    console.log("toooto ", req.body);
    console.log("current cart ", currentCart);
    currentCart.addItem(req.body, currentCart);
    res.send("201 success");
});

//when the cart is chosen and the customer decides to update an item
//the req.body should be {id:"", quantity:Number} id should be inventory id
app.post("/cart/update", urlencodedParser, (req, res) => {
    currentCart.updateItem(req.body, cart);
    res.send("201 succes");
});

//to delete or reduce the number of items. If user desires to delete the entire item
//send req.quantity = the magnitude of the quantity present in the cart
//req.body{id:"",quantity}
app.post("/cart/delete", urlencodedParser, (req, res) => {
    currentCart.reduceItem(req.body, currentCart);
    res.send("201");
});

//to empty a cart after checkOut or when a customer wants to delete it
app.post("/cart/empty", urlencodedParser, (req, res) => {
    currentCart.emptyIt(cart);
    currentCart = new cart({ _id: previousCartID });
    res.send("success");
});
