const router = require("express").Router()
const CategoryController = require("../controllers/category.controller");
const cat_controller = new CategoryController;
const uploader = require("../middleware/uploader.middleware");
const IsLoggedIn = require("../middleware/logincheck.middleware");
const {isAdmin} = require("../middleware/rbac.middleware");

//http://localhost:3001/api/v1/category
router.route('/')
    .get(cat_controller.getAllCats)
    .post(IsLoggedIn, isAdmin, uploader.single('image'),cat_controller.addCategory);

router.get('/parent/:id', cat_controller.getAllChilds);

// http://localhost:3001/api/v1/category/:id
router.route('/:id')
    .get(cat_controller.getCategoryById)
    .put(IsLoggedIn, isAdmin, uploader.single('image'),cat_controller.updateCategory)
    .delete(IsLoggedIn, isAdmin, cat_controller.deleteCategoryById)
module.exports = router;