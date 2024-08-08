import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { Axios } from "axios";

export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (data, thunkApi) => {
        try {
            const response = await Axios.post("api/categories", data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            return response.data;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)