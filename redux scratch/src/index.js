import store from "./customStore";
import * as actions from "./actions";

store.subscribe(() => {
    console.log("Store change", store.getState());
})

console.log(store.getState());

store.dispatch(actions.bugAdded("bug 1"))



console.log(store.getState());