let router = require("express").Router()

const UserController = require("../controllers/user.controller");
const uploader = require("../middleware/uploader.middleware");
const usr_ctrl = new UserController()
const IsLoggedIn = require("../middleware/logincheck.middleware");
const { isAdmin } = require("../middleware/rbac.middleware");
const User = require("../models/user.model");


const selfUpdate = (req, res, next) => {
    User.findById(req.params.id)
    .then((user) => {
        if(user._id === req.auth_user._id || req.auth_user.role === 'admin') {
            next();
        } else {
            next({status: 403, msg: "You do not authorized to update the user."})
        }
    })
    .catch((errr) => next({status: 500, msg: JSON.stringify(errr)}));
}

// /user    => get
// /user    => post
router.route('/')
    .get(usr_ctrl.listAll)
    // .post();

router.route("/:id")
    .put(IsLoggedIn,selfUpdate, uploader.single('image'), usr_ctrl.update)
    .delete(IsLoggedIn, isAdmin, usr_ctrl.delete)
    .get(usr_ctrl.show)

router.get("/getbytype", IsLoggedIn, isAdmin, usr_ctrl.listAllByType)


module.exports = router