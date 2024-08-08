import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const getAllCategories = createAsyncThunk(
    'categories/getAllCategories',
    async (_, thunkAPI) => {
        try {
            const response = await axiosConfig.get('api/categories?populate=*');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)