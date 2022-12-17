import configureStore from './store/configureStore'
import { loadBug, addBug, resolveBug, assignBugToUser } from "./store/bugs";


const store = configureStore()

store.subscribe(() => {
    console.log("Store change", store.getState());
})

store.dispatch(loadBug())

// store.dispatch(addBug({ description: "a" }))
// store.dispatch(addBug({ description: "b" }))
// console.log('2');

// setTimeout(() => {
//     store.dispatch(resolveBug(1641825258474))
// }, 2000);

setTimeout(() => {
    store.dispatch(assignBugToUser(1, 4))
}, 2000);


console.log(store.getState());