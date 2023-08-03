let stds = [
    {
        name: "First Student",
        address: "Kathmandu",
        email: "first@std.com",
        phone: "+977 9809809809"
    },
    {
        name: "Second Student",
        address: "Lalitpur",
        email: "second@std.com",
        phone: "+977 9809809809"
    },
    {
        name: "Second Three",
        address: "Bhaktapur",
        email: "third@std.com",
        phone: "+977 9809809809"
    },
    {
        name: "Second Four",
        address: "Banepa",
        email: "third@std.com",
        phone: "+977 9809809809"
    }
];

let html_str = '';
// let i = 0
let length = stds.length;   // 3
// 0,1,2

// while(i < stds.length) {
for(let i = 0; i<length; i++){
    html_str += "<tr>";
    html_str += "<td>"+(i+1)+"</td>";
    html_str += "<td>"+stds[i].name+ "</td>";
    html_str += "<td>"+stds[i].address+ "</td>";
    html_str += "<td>"+stds[i].email+ "</td>";
    html_str += "<td>"+stds[i].phone+ "</td>";
    html_str += "</tr>";

    // i++;
}


// let user = ["User name",'email', 987654321];
// // [0: value, 1: value, 2: value]

// let sn = 1;
// for(let item of stds) {
//     html_str += "<tr>";
//     html_str += "<td>"+(sn++)+"</td>";
//     html_str += "<td>"+item.name+ "</td>";
//     html_str += "<td>"+item.address+ "</td>";
//     html_str += "<td>"+item.email+ "</td>";
//     html_str += "<td>"+item.phone+ "</td>";
//     html_str += "</tr>";
// }


// for(let key in stds) {
//     html_str += "<tr>";
//     html_str += "<td>"+(key+1)+"</td>";
//     html_str += "<td>"+stds[key].name+ "</td>";
//     html_str += "<td>"+stds[key].address+ "</td>";
//     html_str += "<td>"+stds[key].email+ "</td>";
//     html_str += "<td>"+stds[key].phone+ "</td>";
//     html_str += "</tr>";
// }



// stds.map((item, index) => {
//     html_str += "<tr>";
//     html_str += "<td>"+(index+1)+"</td>";
//     html_str += "<td>"+item.name+ "</td>";
//     html_str += "<td>"+item.address+ "</td>";
//     html_str += "<td>"+item.email+ "</td>";
//     html_str += "<td>"+item.phone+ "</td>";
//     html_str += "</tr>";
// });


// let first_stds = stds[0];
// // {name:'', email:'',address:'', phone: ''}
// let objs = {
//     first_stds
// };  
// /**
//  * {
//  *  first_stds: {name:'', email:'',address:'', phone: ''}
//  * }
//  *  */ 

// for(let key in objs) {
//     console.log(objs[key].name)
//     console.log(objs[key].email)
//     console.log(objs[key].address)
//     console.log(objs[key].phone)
// }

// // {first_std: {}, second: {}} => ["first_std", "second"]

// Object.keys(objs).map((val) => {
//     console.log(objs[val].name)
//     console.log(objs[val].email)
//     console.log(objs[val].address)
//     console.log(objs[val].phone)
// })

document.getElementById('std_data').innerHTML = html_str;


// Create a html table for the product lists
// Create an array with atleast 5 product objects
// product objects should contain, 
    // name, price, discount, brand
// calculate after discount amount of the product and 
// add a new key: after_discount to the existing array
let products = [
    {
        name: "iPhone 12",
        price: 128000,
        discount: 10,
        brand: "apple"
    },
    {
        name: "Galaxy Note 21",
        price: 200000,
        discount: 5,
        brand: "samsung"
    },
    {
        name: "Note 9 Pro",
        price: 50000,
        discount: 25,
        brand: "RedMi"
    },{
        name: "Y9 Pro",
        price: 30000,
        discount: 7,
        brand: "Huawei"
    }
];
let product_html = '';

products.map((o, i) => {
    let aft_dis = o.price - o.price * o.discount / 100
    // o.after_discount = aft_dis;
    products[i].after_discount = aft_dis;
    product_html += "<tr>";
    product_html += "<td>"+(i+1)+"</td>";
    product_html += "<td>"+o.name+"</td>";
    product_html += "<td>"+o.brand+"</td>";
    product_html += "<td>"+o.price+"</td>";
    product_html += "<td>"+o.discount+"</td>";
    product_html += "<td>"+aft_dis+"</td>";
    product_html += "</tr>";
})
document.getElementById('product_data').innerHTML = product_html;
// 
// display on the table 