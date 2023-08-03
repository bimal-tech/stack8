// es5, es6
// es5 
const fs = require("fs");

let fileName = "user.json";
// text data 
let user = {
    name: "Sandesh",
    email: 'sandesh.bhattarai@kotuko.it',
    address: "Kathmandu"
};

user = JSON.stringify(user);

fs.open("file/"+fileName, 'w', (err, fp) => {
    if(err) {
        console.log("Error while opening file.");
    } else {
        fs.writeFile("file/"+fileName,user, (error, success) => {
            if(error) {
                console.log("Error in file");
            } else {
                console.log("Data was stroed in the file.");
            }
        })
    }
})



fs.open("file/"+fileName, 'r', (err, fp) => {
    if(err) {
        console.log("Error opening file");
    } else {
        fs.readFile("file/"+fileName, {encoding: "utf-8"}, (error, data) => {
            if(error) {
                console.log("Error while reading data");
            } else {
                console.log("Data: ", data);
            }
        })
    }
})