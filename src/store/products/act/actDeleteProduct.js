import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.delete(`api/products/${id}`)
            if (!response.ok) {
                throw new Error('Failed to delete the post')
            }
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)