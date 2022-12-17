import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect"
let ids = 1

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

// SELECTOR FUNCTIONs
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.filter(bug => !bug.isResolved)
)

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    (bugs, projects) => bugs.filter(bug => bug.userid === userId)
)