import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

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
    reducers: {
        setUserData: (state, action) => {
            const { id, username, email, provider, confirmed, blocked, token } = action.payload;
            state.id = id;
            state.username = username;
            state.email = email;
            state.provider = provider;
            state.confirmed = confirmed;
            state.blocked = blocked;
            state.token = token;
            state.isLoggedin = true;

            // Save state to cookies
            Cookies.set("auth", JSON.stringify({ user: { id, username, email, provider, confirmed, blocked }, jwt: token }), { expires: 7 }); // 7 days expiration
        },
        clearUserData: (state) => {
            state.id = null;
            state.username = '';
            state.email = '';
            state.provider = '';
            state.confirmed = '';
            state.blocked = '';
            state.token = '';
            state.isLoggedin = false;

            // Clear the cookies
            Cookies.remove("auth");
        },
    },
});

export const { setUserData, clearUserData } = userSlice.actions;



export default userSlice.reducer;
