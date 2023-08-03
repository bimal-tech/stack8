class ClassInfo{
    faculty;
    roll_no;

    constructor(){

    }

    getClassInfo = () => {

    }
}


class Student extends ClassInfo{
    name;
    location;
    score;
    per;

    constructor(){
        super();
    }

    // overriding 
    // getClassInfo = () => {
    //     // custom
    //     super().getClassInfo()
    // }
    
    getUserInputValue = () => {
        this.name = prompt("Enter name: ");
        this.location = prompt("Enter Address: ");
        this.score = Number(prompt("Enter Score: "));
    }

    calculatePercent = () => {
        this.per = this.score / 5;
        // return this;
        // this.all_stds.push(this);
    }

    printHtml = (all_stds) => {
        let html_var = ""
        all_stds.map((o) => {
            html_var += o.name + ", From " + o.location + ". Your Score is: " + o.per + "% <br>";
        });
        document.getElementById('output').innerHTML = html_var;
    }

}

let stds = [];
// [0 => {}, 1 => {}]
const getUserInput = () => {
    let std = new Student();
    std.getUserInputValue()
    std.calculatePercent();
    std.getClassInfo(); // first child
    stds.push(std);
}
