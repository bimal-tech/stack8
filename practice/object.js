// Object and JSON 
// key: value pair
let new_product = {
    name: "Product Name",
    price: 10000,
    stock: 10,
    discount: 10
};

let obj_1 = {
    key: {
        key_1: {

        }
    },
    elem: {}
}



let json_1 = {
    "elem": {},
    "elem_1": {
        "key": {},
        "key_2": {}
    }
}

let arr = [
    [
        []
    ],

]
console.log(new_product);

new_product.after_discount = 900;
delete new_product.stock;
console.log(new_product);

let keys = Object.keys(new_product);
console.log(keys);

let values = Object.values(new_product);
console.log(values);

// new_product.map((item, index)=> {
//     console.log(item);
// })


// this will convert object or array to json string 
let json_product = JSON.stringify(new_product); 

// json to object
let obj = JSON.parse(json_product);

let prod_json = {
    "name": "Product Name",
    "price": 10000,
    "stock": 10,
    "discount": 10
};
// Object

// Array
// String 
// Number 
// Date 

console.log(prod_json.name);
console.log(prod_json['name']);

console.log(new_product.name);
console.log(new_product['name']);

// {}, {}

let all_users = []; // 0, []

let first_user = {
    name: "User One",
    phone: 1231231231,
    address: "Kathamandu",
    email: "userone@email.com"
}

all_users.push(first_user); // 0: 1, [{}]

let second_user = {
    name: "User Two",
    phone: 9876543210,
    address: "Lalitpur",
    email: "usertwo@email.com"
}

all_users.push(second_user);        // 0: 1, 1: 2, [{},{}, {}, {}]
// array of objects 

// [{1},{2},{3},{4}]
all_users.map((obj, index) => {
    console.log(obj);
})


// create an array of product objects which should contain, 
// title, price, discount with atleast 5 products
// using map function in the variable, 
// push after_discount element in every item

let all_prods = [
    {
        // ....
        title: "Produ 1 ",
        price: 1000,
        discount: 10
    }, {
        // ....
        title: "Produ 2 ",
        price: 3000,
        discount: 5
    }
];
// after_discount = item.price - item.price * item.discount / 100;

// map ====
all_prods.map((item, index) => {
    all_prods[index].after_discount = item.price - item.price * item.discount / 100
})

// array of student objects 
// name, obtained_marks, total
// loop thourgh the array and calcultate percentage,
// assign calculated percent to the student object

console.log(all_prods);