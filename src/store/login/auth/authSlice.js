import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const cookieValue = Cookies.get("auth");


let data = { user: { id: null, username: '', email: '', provider: '', confirmed: '', blocked: '' }, jwt: '' };
let isLoggedin = false;

if (cookieValue) {
    data = JSON.parse(cookieValue);
    isLoggedin = true;
}

const initialState = {
    isLoggedin: isLoggedin,
    id: data.user.id,
    username: data.user.username,
    email: data.user.email,
    provider: data.user.provider,
    confirmed: data.user.confirmed,
    blocked: data.user.blocked,
    token: data.jwt,
};


const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

export default userSlice.reducer;
