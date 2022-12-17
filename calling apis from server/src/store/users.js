import { createSlice } from "@reduxjs/toolkit";
let ids = 0

const slice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        userAdded: (users, action) => {
            users.push({
                id: ids,
                name: action.payload.name
            })
            ids++
        },
    }
})

export default slice.reducer

export const { userAdded } = slice.actions