import store from './store'
import { bugAdded, bugRemoved, bugResolved } from "./actions";

console.log(store.getState());

const unsubscribe = store.subscribe(() => {
    console.log("Store gets changed", store.getState())
})

// store = reducer(state, action)
// notify the subscriber

store.dispatch(bugAdded("Bug 1"))
console.log(store.getState());

store.dispatch(bugResolved(1))
console.log(store.getState());

// unsubscribe()

// store.dispatch(bugRemoved(1))

console.log(store.getState());
