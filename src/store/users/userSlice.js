import { createSlice } from "@reduxjs/toolkit"; 
import { getAllUsers } from "./act/actGetAllUsers";
import { deleteUser } from "./act/actDeleteUser";
import { getOneUser } from "./act/actGetOneUser";

const initialState = {
    records: [],
    loading: false,
    error: null,
    record: null,
}

const getAllUsersSlice = createSlice({
    name : "users",
    initialState,
    extraReducers: (builder) =>{
        builder
        //getAllUsers
        .addCase(getAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
        })
        .addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
        //getOneUser
        .addCase(getOneUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOneUser.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        })
        .addCase(getOneUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        //deleteUser
        .addCase(deleteUser.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.records.filter((el => el.id !== action.payload))
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default getAllUsersSlice.reducer