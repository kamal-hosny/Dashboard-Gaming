import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const getOneCategory = createAsyncThunk(
    "categories/getOneCategory",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`api/categories/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)