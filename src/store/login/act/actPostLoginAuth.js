import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import Cookies from "js-cookie";

export const loginAuth = createAsyncThunk(
    "auth/loginAuth",
    async (data, thunkAPI) => {
      console.log(data);
      try {
        const response = await axiosConfig.post('/api/auth/local', data, {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
        Cookies.set('auth', JSON.stringify(response.data))
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  