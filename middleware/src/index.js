import configureStore from './store/configureStore'
import { bugAdded, bugResolved, bugRemoved, bugAssignToUser } from "./store/bugs";
import { projectAdded } from "./store/projects";
import { getUnresolvedBugs, getBugsByUser } from './store/bugs'
import { userAdded } from "./store/users"

const store = configureStore()

store.subscribe(() => {
    console.log("Store change", store.getState());
})


store.dispatch(bugAdded({ description: "bug 1" }))

store.dispatch((dispatch, getState) => {
    // call an api
    // when the promis is resolved => dispatch()
    dispatch({ type: "bugsReceived", bugs: [1, 2, 3] })
    console.log(getState());
    // when the promise is not resolved => dispatch()
})

console.log(store.getState());