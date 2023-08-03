const OrderModel = require("../models/order.model");
const { randomStr } = require("../utilities/helpers");

class CartController {
    addToOrder = (req, res, next) => {
        /**
         * [
         * {
         *  ....
         *      product_id: 10,
         *      qty: 2,
         *      sub_total: 1000,
         *      is_paid: true
         * ...
         * },
         * {
         *  ....
         *      product_id: 12,
         *      qty: 2,
         *      sub_total: 1000
         *      is_paid: false
         * ...
         * }
         * ]
         */
        let order_model = [];
        let data = req.body;
        let cart_id = randomStr(10);
        data.map((item) => {
            let ind_itm = {
                cart_id: cart_id,
                user: req.auth_user._id,
                product: item.product_id,
                qty: item.qty,
                sub_total: item.sub_total,
                status: 'new',
                is_paid: item.is_paid
            }
            order_model.push(ind_itm);
        })
        OrderModel.insertMany(order_model);
        res.json({
            result: order_model,
            status: true,
            msg: "Order Created successfully."
        })
    }
}

module.exports = CartController;