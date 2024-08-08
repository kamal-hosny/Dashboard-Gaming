import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";

export const editProduct = createAsyncThunk(
    'products/editProduct', 
    async (data, thunkApi) => {
        console.log(data.data);
        try {
            const response = await axiosConfig.put(`api/products/${data.data.id}`, data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)