import { compose, pipe } from 'lodash/fp';  // gives functional programming utilities

// --------------------------------------- Fuctional Composition -----------------------------------------
// trim
// wrap it around div

// Non functional way
let input = "     Javascript    "
let output = "<div>" + input.trim() + "<div/>"

// using functional composition

const trim = str => str.trim()
const wrapInDiv = str => `<div>${str}</div>`
const toLowerCase = str => str.toLowerCase()
const result = wrapInDiv(toLowerCase(trim(input)))   // to much parenthesis to solve issue composing and piping
console.log(result);

// ------------------------------------- composing and piping ---------------------------------------------
const transform = compose(wrapInDiv, toLowerCase, trim)  // convert all the function into one higher order function
// but the direction  should be from right to left , first fun to be executed should be right
console.log(transform(input));

// to solve direction issue we can use pipe the 1st fun to be excuted should be written on right
const transform1 = pipe(trim, toLowerCase, wrapInDiv)
console.log(transform1(input));

// ------------------------------------  CURRYING -------------------------------------------------------
// here we want a wrap general function which will wrap a string on gievn type element 
const wrap = (type, str) => `<${type}>${str}<${type}/>`
// but there issue in pipe that it take one return value and it pass it to the the next function as a argument
// To solve this currying is used (what is currying ? see currying.js)
const wrap1 = type => str => `<${type}>${str}<${type}/>`
const transform2 = pipe(trim, toLowerCase, wrap1("span"))
console.log(transform2(input));

// --------------------------------------- PURE FUNCTIONS ------------------------------------------------
// Function that we give same argument gives same result are called pure functions
// Pure Function Conditions
// 1) No random values  2) No current date/time  3) No global state (DOM,db, files , etc) 4) No mutation of parameters

// ---------------------------------------- Immutability ------------------------------------------------
// In redux we should follow immutability 
// Note: using const to declare variable does not help to achieve immutability , but it helps in avoiding reassignment but not immutaability
// --- Updating Object through immutability
const person = {
    name: "yash",
    address: {
        city: "surat",
        area: "gandhinagar"
    }
}

// Method 1)
console.log(Object.assign({}, person, { name: "yooo", age: 30 }));  // params: (new Object, Object to be upadte, {update content})

// Method 2)
console.log(
    {
        ...person,
        name: "hiii",
        address: { ...person.address, city: "Mumbai", area: "Ghatkopar" }
    }
);

// --- Updating Arrays
const array = [1, 2, 3]

// - Adding a element in array 
console.log([0, ...array, 4, 5]);
// adding element at particular position
// Eg adding a element before 2
const index = array.indexOf(2)
console.log([
    ...array.slice(0, index), 8, ...array.slice(index)
]);

//  - removing a element in array 
console.log(
    array.filter(n => n !== 2)
);

// - updating a element in a array
// here updating 2 with 20
console.log(
    array.map(n => n == 2 ? 20 : n)
);

// --------------------------------------- Enforcing Immutability ---------------------------------------
// enforcing immutablity using some of the libraries
// --- 1) Immutable.js  - see in immutableLib.js
// ---- 2) immer.js - see in immerLib.js
 