import { createSlice } from "@reduxjs/toolkit"; 
import { getAllCategories } from "./act/actGetAllCategories";
import { createCategory } from "./act/actCreateCategory";
import { deleteCategory } from "./act/actDeleteCategory";
import { editCategory } from "./act/actEditCategory";
import { getOneCategory } from "./act/actGetOneCategory";


const initialState = { 
    records: [],
    loading: false,
    error: null
}

const getAllCategoriesSlice = createSlice({
    name: "Categories",
    initialState,
    extraReducers: (builder) => {
        builder
        // getAllCategories
        .addCase(getAllCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
        })
        .addCase(getAllCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // createState
        .addCase(createCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                state.records.push(action.payload);
            } else {
                state.records = [action.payload];
            }
        })
        .addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // deleteState
        .addCase(deleteCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // editState
        .addCase(editCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(editCategory.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                const index = state.records.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.records[index] = action.payload;
                }
            }
        })
        .addCase(editCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // getOneState
        .addCase(getOneCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOneCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        })
        .addCase(getOneCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default getAllCategoriesSlice.reducer;