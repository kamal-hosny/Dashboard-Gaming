import { configureStore } from "@reduxjs/toolkit"; 
import modal from '../store/modal/modalSlice' 
export const store = configureStore({
    reducer: {
        modal
    }
})