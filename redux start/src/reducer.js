import * as actions from "./actionTypes";
// always add minumum required data to the payload of action

export default function reducer(state = [], action) {
    switch (action.type) {
        case actions.BUG_ADDED:
            return [
                ...state,
                {
                    id: 1,
                    description: action.payload.description,
                    isResolved: false,
                }
            ]

        case actions.BUG_REMOVED:
            return state.filter(bug => bug.id !== action.payload.id)

        case actions.BUG_RESOLVED:
            console.log('hi')
            return state.map(bug => bug.id === action.payload.id ? { ...bug, isResolved: true } : bug)

        default:
            return state;
    }
}