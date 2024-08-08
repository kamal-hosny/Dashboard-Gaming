import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (pageNumber, thunkAPI) => {
    console.log(pageNumber);
    try {
      const response = await axiosConfig.get(`api/products?populate=*&pagination[page]=${pageNumber}&pagination[pageSize]=10`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
