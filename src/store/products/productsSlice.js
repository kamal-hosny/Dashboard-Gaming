import { createSlice } from "@reduxjs/toolkit"; 
import { getAllProducts } from "./act/actGetAllProducts";
import { deleteProduct } from "./act/actDeleteProduct";
import { editProduct } from "./act/actEditProduct";
import { getOneProduct } from "./act/actGetOneProduct";
import { createProduct } from "./act/actCreateProduct";

const initialState = {
    records: [],
    loading: false,
    error: null,
    record: null,
};

const getAllProductsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder
        // getAllProducts
        .addCase(getAllProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // createProduct
        .addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                state.records.push(action.payload);
            } else {
                state.records = [action.payload];
            }
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // deleteProduct
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // editProduct
        .addCase(editProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(editProduct.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                const index = state.records.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.records[index] = action.payload;
                }
            }
        })
        .addCase(editProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // getOneProduct
        .addCase(getOneProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOneProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        })
        .addCase(getOneProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default getAllProductsSlice.reducer;
