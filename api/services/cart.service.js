const OrderModel = require("../models/order.model");

class CartService{
    getTotalAmount = async (cart_id)  =>  {
        let pipeline = [
            {
              '$match': {
                'cart_id': cart_id
              }
            }, {
              '$project': {
                'sub_total': 1
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$sub_total'
                }
              }
            }
          ];
        return await OrderModel.aggregate(pipeline);
    }
 }