import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id, thunk) => {

        console.log(id);
        try {
            const response = await axiosConfig.delete(`api/users/${id}`)
            if(!response.ok) {
                throw new Error('Failed to delete the post')
            }
            return id;
        } catch (error) {
            return thunk.rejectWithValue(error.response.data)
        }
    }
)