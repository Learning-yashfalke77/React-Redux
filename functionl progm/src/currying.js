function add(a, b) {
    return a + b
}
console.log(add(1, 2));

// currying function
function add1(a) {
    return function (b) {
        return a + b
    }
}
console.log(add(1)(2));

// currying function using arrow function

const add2 = (a) => (b) => a + b
console.log(add(1)(2));