const { array } = require("yargs");

let a = 10; 
let b = 20; 

let c = a + b;  // synchronous call

function dataFetch(){
    // .. 
    // db query to fetch
    console.log("I am inside abc");

    // variable populate
    // cbFunction();

}

function showHtml(){
    // html show
}


// dataFetch();    // 0 1 2 3 4
// showHtml();

const testTime = () => {
    console.log("I am inside settimeout");
}

setTimeout(testTime, 3000);

const arrayItem = (item,index) => {

}
// array.map(arrayItem);
console.log("I am outside settimeout")

// callback functions have 2 arguments

// error, success


let askMoney = (purLap, wriPrg) => {
    console.log("Please provide me money to purchase Laptop.")
    let money  = true;
    if(money){
        purLap(null, wriPrg)
    } else {
        purLap(true)
    }
}

let purchaseLaptop = (err, prgWri) => {
    if(err){
        console.log("I don't have money to purchase Laptop.");
    } else {
        console.log("I have money, and I purchased a laptop");
        prgWri();
    }
}

let writeProgram = () => {
    console.log("Let's write JS program");
}


// askMoney()
// purchaseLaptop()
// writeProgram();



askMoney(purchaseLaptop, writeProgram)



function login(email, password) {
    // login 
}

let result = login('', ''); // boolean, 