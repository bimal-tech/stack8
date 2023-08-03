const doSomething = () => {
    console.log("I am inside do something");


    const doNothing = () => {
        console.log("I am inside doNothing");
    }

    return doNothing;
    // doNothing();
}


// let result = doSomething();
//result();
// doNothing();


// WAP to take input from the user for dividing two 
// numbers. 
// condition: 
// if second input is less than or equal to zero,
//  ask user to 
// reinput the second number only.
// by using clouser

const calculate = () => {
    let getNumb = (msg, extra = false) => {

        msg = "Enter "+msg+ " Number: ";

        if(extra){
            msg += "(Number should be greater than 0.)";
        }
        let num = Number(prompt(msg, 1))
        return num;
    }
    
    // recursive function
    let b;
    let getSecondInput = (extra = false) => {
        
        b = getNumb('second', extra);   // 0, -1, 3

        if(b <= 0){
            getSecondInput(true)
        } else {
            showResult(a, b);
            // return b;
        }
    }

    let showResult = (a, b) => {
        let result = a/b;
        alert("Result: " + result );
    }
    
    
    let a = getNumb("first");
    let c = getSecondInput();
}

// calculate();