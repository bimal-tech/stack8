// named export 
const getName = () => {
    return "Sandesh";
}
const getAddress = () => {
    return "Kathmandu";
}
// ES5
// module.exports = getName;

// es6
// export default getName;

// all export 
export {
    getName, getAddress
};