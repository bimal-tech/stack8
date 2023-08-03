const router = require("express").Router();
const IsLoggedIn = require("../middleware/logincheck.middleware");
const {isCustomer} =  require("../middleware/rbac.middleware")
const CartController = require("../controllers/cart.controller");
const cart_ctrl = new CartController();

// /api/v1/checkout
router.post('/', IsLoggedIn, isCustomer, cart_ctrl.addToOrder);
module.exports = router;