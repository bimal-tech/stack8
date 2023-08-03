const express = require("express");
const auth_routes = require("./auth.routes");
const user_routes = require("./user.routes");
const label_routes = require("./label.routes");
const category_routes = require("./category.routes");
const product_routes = require("./product.routes");
const order_routes = require("./order.routes");

const app = express();

// /api/v1
app.use("/",auth_routes);
// /api/v1/user
app.use("/user",user_routes);
// /api/v1/label
app.use("/label", label_routes);
// /api/v1/category
app.use("/category", category_routes);
// /api/v1/product/
app.use("/product", product_routes);
// /api/v1/checkout
app.use("/checkout", order_routes);


module.exports = app;