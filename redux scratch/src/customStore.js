import reducer from "./reducer";

// Only thing that is not done is validati the data coming from function i.e. data

function createStore(reducer) {
    let state
    const listeners = []

    const getState = () => state

    const dispatch = (action) => {
        state = reducer(state, action)
        for (const listener of listeners) {
            listener()
        }

    }

    const subscribe = (listener) => {
        listeners.push(listener)
    }

    return {
        getState,
        dispatch,
        subscribe,
    }
}

export default createStore(reducer)