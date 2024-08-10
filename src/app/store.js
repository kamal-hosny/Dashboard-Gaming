import { configureStore } from "@reduxjs/toolkit"; 
import modal from '../store/modal/modalSlice'
import getAllProductsSlice from '../store/products/productsSlice'
import getAllStatesSlice from '../store/states/stateSlice' 
import getAllCategoriesSlice from '../store/category/categorySlice'
import getAllUsersSlice from '../store/users/userSlice'
import { postLoginAuthSliceReducer } from "../store/login/loginAuthSlice";
import authSlice from "../store/login/auth/authSlice";
import postImageSlice from "../store/image/imageSlice"

export const store = configureStore({
    reducer: {
        
        loginAuth: postLoginAuthSliceReducer,
        userAuth: authSlice,
        modal,
        allProducts: getAllProductsSlice,
        allStates : getAllStatesSlice,
        allCategories : getAllCategoriesSlice,
        getAllUsers: getAllUsersSlice,
        postImage: postImageSlice
    }
});
