import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (data, thunkAPI) => {
    // console.log(data);
    // console.log(data.statesValue);
    
    try {
      // Build the query string conditionally
      let query = `api/products?populate=*&pagination[pageSize]=10&filters[name][$startsWithi]=${data.term}&populate=states&populate[states]=*&populate[img]=*&populate[mainImg]=*&populate[categories]=*`;

      // Add the filters[states][name][$containsi] parameter
      if (data.statesValue) {
        query += `&filters[states][name][$containsi]=${data.statesValue}`;
      }

      if (data.pageNumber) {
        query += `&pagination[page]=${data.pageNumber}`;
      }

      const response = await axiosConfig.get(query);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
