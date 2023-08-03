let a = 10;
let b = 1;

let division = new Promise((res, rej) => {
    if(b <= 0){
        rej()
    } else {
        res(a/b)
    }
})

division
.then((success) => {
    console.log("Result is: ", success);
})
.catch((err) => {
    console.log("b shoule be greater than 0");
})

// db query         // table 


// architecture 
// query
// db 
// html populate

let prom = new Promise((res, rej) => {
    // success
    res();
    // failed
    rej();
});

// table query
prom.then((response) => {
    // populate

    // xyz, not defined
})
.catch((error) => {
    // reject
    // xyz, not defined
})
.finally(() => {
    // xyz
})




let abc = () => {
    return new Promise((res, rej) => {
        
        if(false){
            res()
        } else {
            rej("Error REsponse")
        }
    });
}

abc()
.then((response) => {
    console.log(response);
})
.catch((error) => {
    console.log(error);
})


let abc1 = async () => {
    return "hello";
}

let result = async () => {
    try{
        let res = await abc();
        console.log(res);
    } catch(e) {
        console.log(e);
    }

    // abc().then().catch()
}
result()

