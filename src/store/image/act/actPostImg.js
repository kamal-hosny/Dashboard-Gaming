import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { Axios } from "axios"; 

export const postImg =  createAsyncThunk(
    "image/postImg",
    async (formData, thunkAPI) => {
        try {
            const response = await Axios.post("api/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                
            });
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }, 
    
)