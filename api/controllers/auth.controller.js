const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const AuthService = require("../services/auth.service");
const auth_svc = new AuthService();



const bcrypt = require("bcrypt");
const CONSTANTS = require("../config/constants");

class AuthController {
    login = async (req, res, next) => {
        let data = req.body;

        try {
            let result = await User.findOne({
                email: data.email
            });


            if (result) {
                // password check 
                if(bcrypt.compareSync(data.password, result.password)){
                    // password match
                    let token = this.generateToken({
                        id: result._id,
                        name: result.name,
                        email: result.email,
                        role: result.role
                    });

                    req.myEvents.emit("hello");
                    // push code

                    res.json({
                        result: {
                            token: token,
                            user: result
                        },
                        status: true,
                        msg: "You are successfully logged in"
                    })
                } else {
                    next({status: 400, msg: "Password does not match"})
                }
            } else {
                // res.status(401).json({
                //     result: null,
                //     status: false,
                //     msg: "User not found"
                // })
                next({status: 401, msg: "User Not found"})
            }
        } catch (error) {
            next(error);
        }
    }

    register = async (req, res, next) => {
        let data = req.body;
        if (req.file) {
            data.image = req.file.filename;
        }
        try {            
            let user = await User.findOne({
                email: data.email
            })
            if (user) {
                next({ status: 400, msg: "Email already taken" })
            } else {
                // data['password'] 
                data['password'] = bcrypt.hashSync(data['password'], 10);
                data.address = {
                    shipping: {
                        location: null,
                    },
                    billing: {
                        location: null,
                    }
                };
                data.address.shipping.location = data['shipping_location'];
                data.address.billing.location = data['billing_location'];

                let user = new User(data);
                user.save()
                    .then((response) => {
                        res.json({
                            result: response,
                            status: true,
                            msg: "User registered successfully"
                        })
                    })
                    .catch((error) => {
                        next(error);
                    })
            }
        } catch (error) {
            next(error);
        }
    }


    getUserById = (req, res, next) => {
        // MongoClient.connect(dbUrl, (err, client) => {
        //     if(err) {
        //         next(err);
        //     } else {
        //         let db = client.db('stack-8');
        //         db.collection('users').find({_id: ObjectId(req.params.id)})
        //         .toArray()
        //         .then((user) => {
        //             // user 
        //         })
        //     }
        // })
    }


    generateToken = (data) => {
        let token = jwt.sign(data, CONSTANTS.JWT_SECRET, {
            expiresIn: (7*24*60*60)
        });
        return token;
    }

    changePwd= async (req, res,next) => {
        if(req.body.password !== req.body.re_password) {
            next({
                status: 400,
                msg: "Password and re-password does not match"
            })
        } else {
            try{
                let auth_user = req.auth_user;
                let response = await auth_svc.changePassword(auth_user, req.body.password)
                res.json({
                    result: null,
                    status: true,
                    msg: "Password changed successfully"
                })
            } catch(error) {
                console.log("PwdChange: ", error);
                next({
                    status: 400,
                    msg: error
                })
            }
        }
    }

    sendResetToken = async (req, res, next) => {
        // token 
        // sms otp 
        // nodemailer
    }

    veirfyToken = async (req, res, next) => {

    }

    verifyOTP = async (req, res, next) => {

    }
}
module.exports = AuthController;