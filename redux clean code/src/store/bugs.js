import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect"
let ids = 1
// redux toolkit give us a bunch of lib function to simplify our code

// // Action Creators 
// export const bugAdded = createAction("bugAdded")   // returns the function with type and payload

// export const bugRemoved = createAction("bugRemoved")

// export const bugResolved = createAction("bugResolved")

// // reducers
// export default createReducer([], {
//     // key: value
//     // action: function to handle action
//     [bugAdded.type]: (state, action) => {       // write code but in mutable way , under the hood create reduce will update in immutable way
//         state.push({
//             id: 1,
//             description: action.payload.description,
//             isResolved: false,
//         })
//     },
//     [bugRemoved.type]: (state, action) => {
//         const index = state.findIndex(bugId => bugId === action.payload.id)
//         state.splice(index, 1)
//     },
//     [bugResolved.type]: (state, action) => {
//         const index = state.findIndex(state => state.id === action.payload.id)
//         state[index].isResolved = true
//     },

// })

// ------------------------------------------ redux toolkit also has function direclty creates everything -----------------
const slice = createSlice({
    name: "bugs",
    initialState: [],
    reducers: {
        // key: value
        // action: function to handle action
        bugAdded: (bugs, action) => {       // write code but in mutable way , under the hood create reduce will update in immutable way
            bugs.push({
                id: ids,
                description: action.payload.description,
                isResolved: false,
            })
            ids++
        },
        bugRemoved: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id)
            bugs.splice(index, 1)
        },
        bugResolved: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id)
            bugs[index].isResolved = true
        },
        bugAssignToUser: (bugs, action) => {
            const {bugId, userId} = action.payload
            const index = bugs.findIndex(bug => bug.id === bugId)
            console.log(index);
            bugs[index].userId = userId
        }

    }
})

export default slice.reducer

export const { bugAdded, bugRemoved, bugResolved, bugAssignToUser } = slice.actions

// SELECTOR FUNCTIONS
export const getUnresolvedBugs = bugs => (
    bugs.entities.bugs.filter(bug => !bug.isResolved)
)

// Memoizing
// evrytime we call a function it gives new array even after the state is not change, so will store it in cache  if it is not changed
// use the library reselect : npm i reselect

export const getUnresolvedBugsOptimised = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.filter(bug => !bug.isResolved)
)

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    (bugs, projects) => bugs.filter(bug => bug.userid === userId)
)

// so if the bugs and projects is not changed then it will send the same array do not filter again