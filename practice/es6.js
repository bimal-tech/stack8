// ECMA Scripts
// es5 

// es6
// a. Object shorthand rule
let user = {
    name: "Sandesh",
    email: "sandesh.bhattarai@kotuko.it"
}

let user_1 = {
    user   
}

// {user: {}}

// b. Object Destructuring
let product = {
    name: "Product One",
    category: "Phone",
    brand: "Samsung",
    price: 12312,
    discount: 10
}

var {name, category, brand} = product;
// c. Spread and rest Operator
let product_info = {
    ...product,
    seller: 123,
    stock: 10,
    status: "availabel"
}

var {name, category, brand, ...other} = product_info

// d. Arrow notation 
function Name(){

}

const nameFunct = () => {
    // 
    let a = 10;
    return a;
}
let a =20;
const nameFunct1 = () => true;
const nameFunct2 = () => (a);

// .map(() => (
//     // 
// ))

// e. Class based OOp
class CLassName{
    // code
}

let obj  = new CLassName();

// f. Template Literals 
let name = "Sandesh";
let role = "admin";

let template = "Dear name, Welcome to the role Panel";
// user data 
let temp = `Dear ${name}, Welcome to the ${role} Panel`;

// register 

// g. TypeScripts(ts)

// h. Default Parameter 
function functionName(a, b = 0){

}

functionName(10)

// i. Import-export 
// Module 
// auth 

// es5 
// node_modules, default node modules
// const getName = require("./funct");

// es6
// default import 
//import getName from "./funct";

// named import 
// import {getName} from "./funct";

// all import 
import * as functions from "./funct";

// import image from "./abc.svg";

// Es5, Es6 
// Default, all, named 
functions.getName();