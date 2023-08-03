/**
 * a. Arithematic Operators 
 *      +, -, *, /, %
 * b. Increment or decrement Operators
 *      ++, --
 * c. Assignment Operator
 *      =, +=, -=, *=, /=, %=
 * d. Comparision Operator 
 *      <, >, <=, >=, ==, !=, ===, !==
 * e. String concatination Operator 
 *      ,  +
 *  f. Logical Operator
 *      &&, ||, !
 *  g.  Spread and Rest operator
 *      ...
 *  h. Conditional Or Ternary Operator 
 *       (exp) ? true : false
 *          
 *          ??
 *      
 */

let a = 13;
let b = 2; 

// exact division
let c = a / b;  // 6.5

// remainder
c = a % b;      // 1

// a = 13
a = a + 1;  // 14

console.log(a++);   //post assign, first print, 14 -> after, assign => 15
// a = 15
console.log(++a)    // pre assign,  first assign, 16, print => 16

// a = 16
// a = a + 4;
a += 4;     // summation

let first = "Sandesh";

first += " Bhattarai";      // concatination 

//
let x = 10;
let y = '16';

// type cast
// y = Number(y);

// y = parseInt(y) // returns integer only
// y = parseFloat(y)   // returns float of any number

// let z = x+y;    // 1010

console.log(a > y) // true

console.log(a !== y);   // true

console.log("The value is: " + a);

// truthy or falsy value 
// falsy value: null, false, 0, "", '', ``, undefined, NaN
(x && y && a && b == 15)    // false 
(x || y || a || b== 15);    // true
!(!x || y || a || b== 15);    // !(true) => false


let user = {
    name: "b",
    email: "b@c.com",
    password: "abc"
}

let user_1 = {
    // name: "b",
    // email: "b@c.com",
    // password: "abc",
    ...user,
    address: "",
    phone: "" 
}
let person = {
    ...user,
    address: "",
    phone: ""
}       // name, email, password, address, phone



// let address = person['address'];
// let name = person.name;

// object destructuring 
let {name, address, ...other_data} = person

//
// let role_set;
let role = (role_set && role_set != null) ? role_set : "admin";


role = role_set ?? 'admin';