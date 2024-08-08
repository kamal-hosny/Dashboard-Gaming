import { configureStore } from "@reduxjs/toolkit"; 
import modal from '../store/modal/modalSlice'
import getAllProductsSlice from '../store/products/productsSlice'
import getAllStatesSlice from '../store/states/stateSlice' 
import getAllCategoriesSlice from '../store/category/categorySlice'
import { postLoginAuthSliceReducer } from "../store/login/loginAuthSlice";
import authSlice from "../store/login/auth/authSlice";

export const store = configureStore({
    reducer: {
        
        loginAuth: postLoginAuthSliceReducer,
        userAuth: authSlice,
        modal,
        allProducts: getAllProductsSlice,
        allStates : getAllStatesSlice,
        allCategories : getAllCategoriesSlice
        
    }
});
