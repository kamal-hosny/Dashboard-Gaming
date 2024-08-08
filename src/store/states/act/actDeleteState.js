import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const deleteState = createAsyncThunk(
    "states/delateState",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.delete(`api/states/${id}`)
            if(!response.ok) {
                throw new Error('Failed to delete the post')
            }
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)