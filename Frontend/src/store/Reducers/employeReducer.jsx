import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employe : null,
    isAuth: false,
};

export const employeSlice = createSlice({
    name: "employe",
    initialState,
    reducers: {
        saveEmploye: (state, action) => {
            console.log(action.payload)
            state.employe = action.payload;
            state.isAuth = true;
        },
        removeEmploye: (state, action) => {
            state.employe = null;
            state.isAuth = false;
        }
        
    },
});

export const { saveEmploye, removeEmploye } = employeSlice.actions;

export default employeSlice.reducer;