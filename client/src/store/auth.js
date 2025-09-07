import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    status: false,
    jsonData: null
};

try {
    const persisted = JSON.parse(localStorage.getItem('authState'));
    if (persisted && typeof persisted === 'object') {
        initialState = persisted;
    }
} catch {}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.jsonData = action.payload.jsonData;
            localStorage.setItem('authState', JSON.stringify({
                status: true,
                jsonData: action.payload.jsonData
            }));
        },
        logout: (state) => {
            state.status = false;
            state.jsonData = null;
            localStorage.removeItem('authState');
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
