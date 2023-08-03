const mongoose = require("mongoose");
const OrderSchemaDef = new mongoose.Schema({
    cart_id: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true, 
    }, 
    qty: {
        type: Number,
        required: true
    },
    sub_total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["new", "verified", "cancelled", "delivered"],
        default: "new"
    },
    is_paid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const OrderModel = mongoose.model("Order", OrderSchemaDef);
module.exports = OrderModel;


// condition => data 
// data -> loop -> sum