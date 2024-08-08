import { createSlice } from "@reduxjs/toolkit"; 
import { getAllStates } from "./act/actGetAllStates";
import { createState } from "./act/actCreateState";
import { deleteState } from "./act/actDeleteState";
import { editState } from "./act/actEditState";
import { getOneState } from "./act/actGetOneState";

const initialState = { 
    records: [],
    loading: false,
    error: null
}

const getAllStatesSlice = createSlice({
    name: "states",
    initialState,
    extraReducers: (builder) => {
        builder
        // getAllStates
        .addCase(getAllStates.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllStates.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
        })
        .addCase(getAllStates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // createState
        .addCase(createState.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createState.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                state.records.push(action.payload);
            } else {
                state.records = [action.payload];
            }
        })
        .addCase(createState.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // deleteState
        .addCase(deleteState.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteState.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        })
        .addCase(deleteState.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // editState
        .addCase(editState.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(editState.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                const index = state.records.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.records[index] = action.payload;
                }
            }
        })
        .addCase(editState.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // getOneState
        .addCase(getOneState.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOneState.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        })
        .addCase(getOneState.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default getAllStatesSlice.reducer;