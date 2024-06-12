import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    isSignedIn: false,
    token: Cookies.get('token') || null,
  };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
            state.isSignedIn = true
            Cookies.set('token', accessToken)
        },
        logOut: (state) => {
            state.token = null
            state.isSignedIn = false
            Cookies.remove('token');
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token