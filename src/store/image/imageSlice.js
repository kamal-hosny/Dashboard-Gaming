import { createSlice } from "@reduxjs/toolkit";
import { postImg } from "./act/actPostImg";

const initialState = {
    img: "",
    mainImg: "",
    loading: false,
    error: null
}

const postImageSlice = createSlice({
    name: "image",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(postImg.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postImg.fulfilled, (state, action) => {
                state.loading = false;
                state.img = action.payload.img;
                state.mainImg = action.payload.mainImg;
            })
            .addCase(postImg.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }
})

export default postImageSlice.reducer