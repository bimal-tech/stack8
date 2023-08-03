// Data type
// a. String / text
    // "", '', ``
// b. Numbers 
    // integer, float
// c. Boolean
    // true, false
// d. Null 
    // null, "", '', ``
// e. Array 
    // It's a collection of data 
    // any datatype 
// f. Object
// g. JSON 
// h. Undefined
    // 
// i. NaN
    // Not a Number

let a = '10';   // string
let b = 10;     // number


let bool_true = true;   // 1
let bool_false = false; // 0

let name = null;
name = '';  // array operation 

// JS is also known as loosely typed programming language 
let last;   // variable , undefined

// Data in array is stored in comma seperated way 
// every data is stored in index=>value pair
// index always starts from 0
// last_index = size - 1

// one user 
let user_0 = [
    "User One",         // 0
    "Kathmandu",        // 1
    123123131,          // 2
    "userone@test.com"  // 3
];

console.log(user_0[3])

// user two 
let user_1 = new Array(
    "User Two",
    "Lalitpur", 
    9876543210, 
    "usertwo@test.com"
);
console.log(user_1[3])


let all_users = [
    [
        "User One",         // 0
        "Kathmandu",        // 1
        123123131,          // 2
        "userone@test.com"  // 3
    ],      // 0 => array
    new Array(
        "User Two",     //0
        "Lalitpur",     // 1
        9876543210, 
        "usertwo@test.com"
    ),
    [
        "User Three",         // 0
        "Kathmandu",        // 1
        123123131,          // 2
        "userone@test.com"  // 3
    ],
    [
        "User Four",         // 0
        "Kathmandu",        // 1
        123123131,          // 2
        "userone@test.com"  // 3
    ],
];


// ecom 
// product 

// Array are of two types;
    // Single Dimensional Array
        // an array consinting of non array/object/json elements
    // Multi Dimensional Array
        // an array containing atleast one array element
// console.log(all_users[0][0])
// console.log(all_users[1][0])
// console.log(all_users[2][0])
// console.log(all_users[3][0])
let all_products = [
    [
        "Product Name 1",       // 0
        123000,                 // 1
        10,                     // 2
        10                      // 3
    ],
    [
        "Product Name 2",
        23400,
        15,
        1
    ],
    [
        "Product Name 3",
        3200,
        0,
        15
    ]
];
// inserting element in an array
let new_product = [
    "Product name 4",
    10000,
    10,
    20
];

console.log(all_products);
// push operation  , to insert element at end 
all_products.push(new_product);

// 4
// unshifting , to insert element in 0 index
all_products.unshift(new_product);
// 5

// last_index = size-1
let size = all_products.length;

// 0,1,2,3,4,5
console.log(size)
all_products[size] = new_product;
// 6

// shift, pop 
let first_element = all_products.shift();   // 5
let last_elem = all_products.pop();         // 4


let index_2 = all_products[2];

// delete element from array
delete all_products[2];             // empty slot, 4
all_products[2] = first_element;    // new element

all_products.splice(2,1);           // 3, [0: ele1, 1: ele2, 2: ele3]


// loop, 
all_products.map((item, index) => {
    console.log(item);
});

console.log("");
let array_elem = all_products.filter((item, index) => (item[3] > 10));

console.log(array_elem);
