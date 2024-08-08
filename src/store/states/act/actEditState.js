import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const editState = createAsyncThunk(
    "states/editState",
    async (data, thunkApi) => {
        try {
            const response = await axiosConfig.put(`api/states/${data.id}`, data, {
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