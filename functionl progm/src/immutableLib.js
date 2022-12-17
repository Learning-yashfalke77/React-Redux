// npm i immutable
// Immutable Library provides us a Immutable data Structures to operate
import { Map } from 'immutable';   
// Map is like a key -value immutable data structures
let book = Map({title: "yoo jooginder"})

console.log(book.get("title")); // to get any value on the basis of key
console.log(book.toJS()); // to get in the form of js

function isPublished() {
    return book.set("isPublished", true)  // returns a new array
}

const publishedBook = isPublished()
console.log(publishedBook.toJS());