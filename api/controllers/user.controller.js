const {updateRecord, deleteRecord, getRecord} = require("../services/mongodb.service");
const mongodb = require("mongodb");
const User = require("../models/user.model");

const ObjectId = mongodb.ObjectId;

class UserController {
    user;
    setUser = (user) => {
        this.user = user;
    }
    
    update = (req, res, next) => {
        let data = req.body;
        if(req.file){
            data.image = req.file.filename;
        }
        User.findByIdAndUpdate(req.params.id, {
            $set: data
        })
        .then((success) => {
            res.json({
                result: success,
                status: true,
                msg: "User Updated successfully."
            })
        }) .catch(error => next(error));
    }

    delete = (req, res,next) => {
        //deleteRecord('users', {_id: ObjectId(req.params.id)})
        
        User.findByIdAndDelete(req.params.id)
        .then((success) => {
            res.json({
                result: success,
                status: true,
                msg: "User deleted successfully."
            })
        }) .catch(error => next(error));
    }

    show = (req, res, next) => {
        User.findById(req.params.id, {password: 0})
        .then((user) => {
            res.json({
                result: user,
                status: true,
                msg: "User Fetched"
            })
        }).catch((error) => next(error));
    }

    listAll = (req, res, next) => {
        User.find({}, {password: 0})
        .then((users) => {
            res.json({
                result: users,
                status: true,
                msg: "Fetched"
            })
        })
        .catch((error) => {
            next({status: 500, msg: error});
        })
    }


    listAllByType = (req, res, next) => {
        User.find({
            role: req.query.role
        }, {password: 0})
        .then((users) => {
            res.json({
                result: users,
                status: true,
                msg: "Fetched"
            })
        })
        .catch((error) => {
            next({status: 500, msg: error});
        })
    }

}

module.exports = UserController;