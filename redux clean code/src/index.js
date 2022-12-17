import configureStore from './store/configureStore'
import { bugAdded, bugResolved, bugRemoved, bugAssignToUser } from "./store/bugs";
import { projectAdded } from "./store/projects";
import { getUnresolvedBugs, getUnresolvedBugsOptimised, getBugsByUser } from './store/bugs'
import { userAdded } from "./store/users"

const store = configureStore()

store.subscribe(() => {
    console.log("Store change", store.getState());
})


store.dispatch(bugAdded({ description: "bug 1" }))
store.dispatch(bugAdded({ description: "bug 2" }))
store.dispatch(bugAdded({ description: "bug 3" }))

console.log(getUnresolvedBugs(store.getState()) === getUnresolvedBugs(store.getState()));

console.log(getUnresolvedBugsOptimised(store.getState()) === getUnresolvedBugsOptimised(store.getState()));

store.dispatch(bugResolved({ id: 1 }))

// store.dispatch(bugRemoved({ id: 1 }))

store.dispatch(projectAdded({ name: "yoo jogindeeer" }))

store.dispatch(userAdded({ name: "yash Falke" }))
store.dispatch(userAdded({ name: "user2" }))
store.dispatch(userAdded({ name: "user3" }))

store.dispatch(bugAssignToUser({ bugId: 1, userId: 1 }))

console.log(getBugsByUser(2)(store.getState()));

console.log(store.getState());