let express = require("express");
let router = express.Router();

let AuthController = require("../controllers/auth.controller");
let auth_ctrl = new AuthController();
let IsLoggedIn = require("../middleware/logincheck.middleware");

let uploader = require("../middleware/uploader.middleware");


// http://localhost:3001/api/v1/login
router.post("/login", auth_ctrl.login)

// input => image
router.post("/register",uploader.single('image'), auth_ctrl.register)

router.post('/change-pwd', IsLoggedIn, auth_ctrl.changePwd)
// export router 
module.exports = router;