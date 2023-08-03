const doSomething = () => {
    
    return new Promise((res, rej) => {
        console.log("I am inside doSomething");
        let a = false;
        if(a){
            res("I am resolve of dosomething");
        } else {
            rej("I am reject of dosomething");
        }
    })
}

const doNothing = () => {
    return new Promise((res, rej) => {
        console.log("I am inside doNothing");
        let b = true;
        if(b){
            res("I am resolve of doNothing");
        } else {
            rej("I am reject of doNothing");
        }
    })
}

const testAll = () => {
    return new Promise((res, rej) => {
        console.log("I am inside testAll");
        let c = true;
        if(c){
            res("I am resolve of TestAll");
        } else {
            rej("I am reject of TestAll");
        }
    })
}


// doSomething()
// .then((res_doSmthg) => {
//     console.log("Resolve of doSomething: ", res_doSmthg);
    
//     doNothing()
//     .then((res_doNthg) => {
//         console.log("Resolve of doNothing: ", res_doNthg)

//         testAll()
//         .then((res_tstAl)  => {
//             console.log("Resolve of testAll: ", res_tstAl)
//         })
//         .catch((rej_tstAl) => {
//             console.log("Reject of doNothing: ", rej_tstAl)
//         })

//     })
//     .catch((rej_doNthg) => {
//         console.log("Reject of doNothing: ", rej_doNthg);
//     })
// })
// .catch((rej_doSmthg) => {
//     console.log("Reject of doSomething: ", rej_doSmthg);
// })


doSomething()
.then((res_doSmthg) => {
    console.log("Resolve of doSomething: ", res_doSmthg);
    return doNothing()
})
.then((res_doNthg) => {
    console.log("Resolve of doNothing: ", res_doNthg);
    return testAll()
})
.then((res_tstAll) => {
    console.log("Resolve of testAll: ", res_tstAll);
})
.catch((rej) => {
    console.log("Rejects: ", rej);
})