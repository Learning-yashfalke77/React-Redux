import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect"
import { apiCallBegan } from "./api";
import moment from 'moment'
let ids = 123232

const slice = createSlice({
    name: "bugs",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        // command - event
        // addBug - bugAdded
        bugAdded: (bugs, action) => {
            bugs.list.push(action.payload)
        },
        bugRemoved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id)
            bugs.list.splice(index, 1)
        },
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id)
            bugs.list[index].resolved = true
        },
        bugAssignToUser: (bugs, action) => {
            const { id: bugId, userId } = action.payload
            const index = bugs.list.findIndex(bug => bug.id === bugId)
            bugs.list[index].userId = userId
        },
        bugsRequested: (bugs, action) => {
            bugs.loading = true
        },
        bugsReceived: (bugs, action) => {
            bugs.list = action.payload
            bugs.loading = false
            bugs.lastFetch = Date.now()
        },
        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false
        }

    }
})

export default slice.reducer

const { bugAdded, bugRemoved, bugResolved, bugAssignToUser, bugsReceived, bugsRequested, bugsRequestFailed } = slice.actions

// action creator
const url = "/bugs"
export const loadBug = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs
    const diffMinutes = moment().diff(moment(lastFetch), "minutes") // returns difference in minutes

    return dispatch(apiCallBegan({
        url,   // by default get request is used
        onStart: bugsRequested.type,
        onSuccess: bugsReceived.type,
        onError: bugsRequestFailed.type
    }))
}

export const addBug = (bug) => (
    apiCallBegan({
        url,
        method: 'post',
        data: bug,
        onSuccess: bugAdded.type,
        onError: bugsRequestFailed.type
    })
)

export const resolveBug = id => (
    apiCallBegan({
        url: `${url}/${id}`,
        method: 'patch',
        data: { resolved: true },
        onSuccess: bugResolved.type,
        onError: bugsRequestFailed.type
    })
)

export const assignBugToUser = (bugId, userId) => apiCallBegan({
    url: `${url}/${bugId}`,
    method: 'patch',
    data: { userId },
    onSuccess: bugAssignToUser.type,
    onError: bugsRequestFailed.type
})

// SELECTOR FUNCTIONs
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.filter(bug => !bug.resolved)
)

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    (bugs, projects) => bugs.filter(bug => bug.userid === userId)
)