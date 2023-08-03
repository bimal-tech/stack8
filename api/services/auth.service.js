const bcrypt = require("bcrypt");
const User = require("../models/user.model");

class AuthService{
    changePassword = async (user, password)=> {
        password = bcrypt.hashSync(password, 10)

        return await User.findByIdAndUpdate(user._id, {
            $set: {
                password: password
            }
        })
    }
}

module.exports = AuthService;