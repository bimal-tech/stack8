// document.getElementById('first').innerHTML = "This is another print";
    
console.log("hello there");
console.error("Error");
/* console.warn("Warn")
console.info("Info") */
// ECMA Script
// ES5
// ES6

// class ClassName{}
// function ClassName(){

// }

// Variable and Constants
// variable 
// let b = 10;

// scope 
/// global 
// block 
var a = 10;         // 10, 12345
console.log("Value of a ", a);  // Value of a 10
{
    // code 
    var a = 20;         // 20, change , 12345
    console.log("Value of a ", a);  // Value of a 20
}
console.log("Value of a ", a);  // Value of a 20


let b = 10;         // 10, 12345
console.log("Value of b ", b);  // Value of b 10
{
    // code 
    let b = 20;         // 20, create , 12346
    console.log("Value of b ", b);  // Value of b 20
}
console.log("Value of b ", b);  // Value of b 10

var name = "Sandesh"

var name = "Test user"


// Constants 
// const PI = 3.14;
// const PI = 3;
// PI = 4;