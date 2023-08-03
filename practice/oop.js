// Classes and Object
// User => 
// instance of a class => Object

// Prototype Based 
// Class based

// Prototype based
// constructor , functional Constructor 
// function User(_name, _email){
//     // data 
//     this.name = _name;
//     this.email = _email;
// }

// let user_obj = new User("Sandesh Bhattarai", "sandesh.bhattarai79@gmail.com");

// User.prototype.getName = function(){
//     return this.name;
// }

// 11.9 => 12, ceil => 12, floor => 11
// Math.ceil();


// console.log(user_obj.getName());
// class based 
class Person{
    name = '';
    email = '';
    address = '';

    constructor(_name, _email, _address) {
        // auto execute at the time of object creation
        this.name = _name;
        this.email=_email;
        this.address=_address;
    }

    setName = (_name) => {
        this.name = _name
    }

    setEmail = (_email) => {
        this.email = _email
    }

    setAddress = (_address) => {
        this.address = _address
    }

    getName = function(){
        // 
        // promise(() => {
        //     this
        // })
        return this.name;
    }

}

class User extends Person{
    constructor(name, email, address) {
        super(name, email, address);
    }

    // getName = () => {
    //     return super().getName();
    // }
}



let person = new User("Sandesh", "admin@test.com",'Kathmandu');
console.log(person.getName());
// person.setName("Sandesh");
// person.setEmail("admin@test.com");
// person.setAddress("Kathmandu");

// user => name, location, score, => Percentage 
// print => Name, From location, Your percent is: percent
