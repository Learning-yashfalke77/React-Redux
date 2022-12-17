import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {
        projectAdded: (projects, action) => {
            projects.push({
                id: 1,
                name: action.payload.name
            })
        },
    }
})

export default slice.reducer

export const { projectAdded } = slice.actions