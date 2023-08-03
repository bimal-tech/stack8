// 3 stage
// pending 
// resolve/reject   => Fullfillment
// settlement

// pending -> initial stage where request is made
// resolve/reject =>
    // Resolve => If request is success 
        // if resolve is to be handled, .then is used
    // Reject => If reqeust is failed
        // if reject is to be handled, .catch is used
// settlement -> Ending of Promise


// Promise is an object 

const login = (email, pass) => {
    return new Promise((res, rej)=>{
        // logic implement 
        // res();
        // rej();
        if(email == 'admin@test.com' && pass == "admin123") {
            // success
            res("Login Success");
        } else {
            // failure
            rej("Login Failed");
        }
    });
}
let is_loading = true;
login('admin@test.com', 'admin1234')
.then((response) => {
    // is_loading = false;
    console.log(response);
})
.catch((error) => {
    // is_loading = false;
    console.log(error);
})
.finally(() => {
    is_loading =  false
    console.log("always execute")
})

// wap to divide two numbers, 
// if second number is less than or equal to zero 
// reject the division else resolve the promise.