const router = require("express").Router();

const IsLoggedIn = require("../middleware/logincheck.middleware");
const { isAdminOrSeller, isAdmin } = require("../middleware/rbac.middleware");
const uploader = require("../middleware/uploader.middleware");
const ProductController = require("../controllers/product.controller");

const prod_ctrl = new ProductController();
// post => /
router.route('/')
    .get(prod_ctrl.listAllProducts)
    .post(IsLoggedIn, isAdminOrSeller, uploader.array('image'), prod_ctrl.addProduct)
router.route("/:id")
    .get(prod_ctrl.getProductByid)
    .delete(IsLoggedIn, isAdmin, prod_ctrl.deleteProductById)
    .put(IsLoggedIn, isAdminOrSeller, uploader.array('image'), prod_ctrl.updateProduct);
module.exports = router;