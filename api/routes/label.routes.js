const { labelList, labelAdd, getLabelById, labelUpdate, labelDelete, getLabelBySlug } = require("../controllers/label.controller");
const router = require("express").Router();

const uploader = require("../middleware/uploader.middleware");
const IsLoggedIn = require("../middleware/logincheck.middleware");

router.route('/')
    .get(labelList)
    .post(IsLoggedIn, uploader.single('image'), labelAdd)     // adds labels 

router.get("/bySlug/:slug", getLabelBySlug);
router.route('/:id')
    .get(getLabelById)
    .put(IsLoggedIn,uploader.single('image'), labelUpdate)
    .delete(IsLoggedIn, labelDelete)

module.exports =router;