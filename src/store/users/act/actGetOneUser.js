import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const getOneUser = createAsyncThunk(
    "users/getOneUser",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`api/users/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)