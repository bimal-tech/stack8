/**
 * Built in 
 * Custom functions
 */
// this
// Object.keys();
// Object.values()

// Array.push()
// Array.prototype();
// Array.pop();


// setTimeout();
// setInterval()

// general syntax
function functionName(parm_1, param_2 = 1) {
    // scope
    // define 
    // return;
    // this

    let c = parm_1 * param_2;
    return c;
}

//call
let result = functionName(10);
// c 
// variable assignment
const getName = function(param, params) {
    //\

    // this
}

// es6, arrow type 
const getName1 = (param, params) => {
    //
    // this 
}

// object assigned functions 
const user = {
    name: "sandesh",
    getUser: () => {
        // 
        return this.name;
    }
};
// 
functionName(1,2);
getName(3,5);
getName1(3,5);

user.getUser();     // Object