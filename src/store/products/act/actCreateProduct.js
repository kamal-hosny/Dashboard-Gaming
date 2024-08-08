import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (data, thunkAPI) => {
        try {
            const response = await axiosConfig.post("api/products", data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
            }
            })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)