// npm i immer
import { produce } from "immer";

let book = {title: "yoo jogindeer"}

function isPublished() {
    return produce(book, draftBook => {
        draftBook.isPublished = true,
        draftBook.title = "yash great"
    })
}

const updated = isPublished()
console.log(updated);