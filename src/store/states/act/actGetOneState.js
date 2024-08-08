import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const getOneState = createAsyncThunk(
    "states/getOneState",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`api/states/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)