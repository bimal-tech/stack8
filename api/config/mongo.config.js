const e = require("express");
const mongoose = require("mongoose");

// const dbUrl = "mongodb://localhost:27017/stack-8";

const dbUrl = "mongodb+srv://stack8user:alEMeW9pfdsc9PUV@cluster0.nss1a.mongodb.net/stafck-8?retryWrites=true&w=majority";
mongoose.connect(dbUrl, {
    autoIndex: true,
    autoCreate: true
}, (err) => {
    if(err) {
        console.log("Error while connecting db...");
    } else {
        console.log("DB Connected successfully.");
    }
});