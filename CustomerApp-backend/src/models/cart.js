require("./../db/mongoose");

// var mongoose = require("mongoose");
// var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/new_Hack", {
    useNewUrlParser: true,
    useCreateIndex: true,
});

var Schema = mongoose.Schema;

// var cartElement = new mongoose.Schema({
//     item_ID: { type: Schema.Types.ObjectId, required: true },
//     quantity: { type: Number, min: 0 },
// });

//this schema was used for testing
var cartElement = new mongoose.Schema({
    item_id: { type: String, required: true },
    quantity: { type: Number, min: 0 },
});

// _id should be customer_id + merchant_id
var cart = new mongoose.Schema({
    _id: { type: String, required: true },
    numberItems: { type: Number, min: 0, default: 0 },
    items: [{ type: Schema.Types.ObjectId, ref: "cartElement" }],
});
var items = mongoose.model("items", cartElement);

//checks if the item quantity is zero or not
var isQuantityZero = (element, cart) => {
    if (element.quantity <= 0) {
        cart.items.pull(element);
        items
            .deleteOne({ _id: element._id })
            .then((resut) => {
                console.log("succ delete");
            })
            .catch((err) => {
                console.log(err);
            });
        cart.numberItems -= 1;
        cart.save();
    } else {
        element.save();
    }
};

//updates item based on the quantity specified
cart.methods.updateItem = async (element, cart) => {
    console.log(element);
    items.findOne({ item_id: element.id }, (err, data) => {
        if (err) console.log(err);
        console.log(data);
        if (data) {
            data.quantity += element.quantity;
            data.save();
        } else {
            cart.addItem(element);
        }
    });
};

cart.methods.reduceItem = async (element, cart) => {
    items.findOne({ item_id: element.id }, (err, item) => {
        if (err) throw err;
        if (item) {
            item.quantity -= element.quantity;
            item.save()
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log(item);
            isQuantityZero(item, cart);
        } else {
            throw new error("Item does not exist");
        }
    });
};

//when a new item is added to a cart
cart.methods.addItem = (item, cart) => {
    console.log("curent cart, ", cart);
    console.log("to be added ", item);
    items.findOne({ item_id: item.id }, (err, data) => {
        if (err) console.log(err);
        if (data) {
            data.quantity += item.quantity;
            data.save();
        } else {
            console.log("new item added to itesm");
            var newItem = new items({
                item_id: item.id,
                quantity: item.quantity,
            });
            newItem
                .save()
                .then((result) => {
                    console.log("saved");
                })
                .catch((err) => {
                    console.log(err);
                });
            cart.numberItems += 1;
            cart.items.push(newItem);
            console.log(cart);
            cart.save();
        }
    });
};

cart.methods.emptyIt = async (cart) => {
    var items_array = cart.items;
    for (var i in items_array) {
        items
            .deleteOne({ _id: i })
            .then((res) => {
                console.log("item deleted: cart emptied");
            })
            .catch((err) => {
                console.log(err);
            });
    }
    carts.deleteOne(cart);
};

var carts = mongoose.model("carts", cart);

module.exports = carts;
