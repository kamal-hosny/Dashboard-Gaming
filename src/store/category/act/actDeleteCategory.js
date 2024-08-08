import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const deleteCategory = createAsyncThunk(
    "categories/delateCategory",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.delete(`api/categories/${id}`)
            if(!response.ok) {
                throw new Error('Failed to delete the post')
            }
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)