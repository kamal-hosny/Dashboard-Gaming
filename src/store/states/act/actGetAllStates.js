import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const getAllStates = createAsyncThunk(
    'states/getAllStates',
    async (_, thunkAPI) => {
        try {
            const response = await axiosConfig.get('api/states?populate=*');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)