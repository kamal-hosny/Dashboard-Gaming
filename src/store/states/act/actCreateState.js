import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { Axios } from "axios";

export const createState = createAsyncThunk(
    "states/createState",
    async (data, thunkAPI) => {
        try {
            const response = await Axios.post("api/states", data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)