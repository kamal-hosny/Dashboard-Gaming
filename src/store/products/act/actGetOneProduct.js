import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const getOneProduct = createAsyncThunk(
    "products/getOneProduct", 
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`api/products/${id}?populate=*`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
) 