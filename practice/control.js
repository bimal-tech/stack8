// Decision Making statements
/**
 * 
 *  a. If-else statement 
 *  b. else-if statememt 
 *  c. Switch-case 
 *  d. Loop 
 *      i. while 
 *      ii. for 
 *      iii. for in 
 *      iv. for of
 *      
 *  loop function type: map, filter
 * 
 */

// yes or no 
let age = 16;

if(age >= 16){
    // display content 
} else {
    // no statem
    // optional
}

// nesting of if else 
if(age >= 16){
    // age >= 16
    if(age <= 35){
        // allowed
        // age >=16 and age <=35
    } else {
        // age >= 16 and age > 35
    }
    // age >= 16
}
let marks = 250;
let total = 500;
let per = marks/total * 100;

if(per >= 80) {
    console.log("You are passed in Distinction, Per: ", per)
} else {
    //
    if(per >= 60){
        console.log("You are passed in First Division, Per: ", per);
    } else {
        //
        if(per >= 45){
            console.log("You are passed in Second Division, Per: ", per)
        } else {
            //
            if(per >= 32){
                console.log("You are passed in Third Division, Per: ", per)
            } else {
                console.log("Sorry! you are failed. Per: ", per);
            }
        }
    }
}
// print, 
// per >= 80 => You are passed in Distinction, Per: 80
// per < 80, per >= 60 => You are passed in First Division, Per: 60
// per < 60, per >= 45 => You are passed in Second Division, Per: 45
// per < 45, per >= 32 => You are passed in Third Division, Per: 32,
// per < 32 => Sorry! You are failed. Per: 31.9

if(per >= 80) {
    console.log("You are passed in Distinction, Per: ", per)
} else if(per < 80 && per >= 60){
    console.log("You are passed in First Division, Per: ", per)
}  else if(per < 60 && per >= 45){
    console.log("You are passed in Second Division, Per: ", per)
}  else if(per < 45 && per >= 32){
    console.log("You are passed in Third Division, Per: ", per)
} else if(per < 32){
    console.log("Sorry! You are failed. Per: ", per)
}


switch(true) {
    case (per >= 80):
        console.log("You are passed in Distinction, Per: ", per)
        break;
    case (per < 80 && per >= 60):
        console.log("You are passed in First Division, Per: ", per)
        break;
    case (per < 60 && per >= 45):
        console.log("You are passed in Second Division, Per: ", per)
        break;
    case(per < 45 && per >= 32):
        console.log("You are passed in Third Division, Per: ", per)
        break;
    default: 
        console.log("Sorry! You are failed. Per: ", per)
        break
}

// 
let day = "Sunday";     // Sunday-Saturday
// Friday => Weekend 
// Saturday => Holiday 
// Sunday => Week start
// any => Weekday

if(day == "Sunday" || day == "Saturday") {
    console.log("Holiday");
} else if(day == "Friday") {
    console.log("Weekend");
} else {
    console.log("Weekday");
}


switch(day) {
    case "Friday":
        console.log("Weekend");
        break;
    case "Sunday":
    case "Saturday":
        console.log("Holiday");
        break;
    default: 
        console.log("Weekday");
        break
}