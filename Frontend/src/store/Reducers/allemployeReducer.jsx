import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allemploye : null,
    isAuth: false,
};

export const allemployeSlice = createSlice({
    name: "allemploye",
    initialState,
    reducers: {
        saveAllEmploye: (state, action) => {
            console.log(action.payload)
            state.allemploye = action.payload;
            state.isAuth = true;
        },
        removeAllEmploye: (state, action) => {
            state.allemploye = null;
            state.isAuth = false;
        }
        
    },
});

export const { saveAllEmploye, removeAllEmploye } = allemployeSlice.actions;

export default allemployeSlice.reducer;