import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    manager : null,
    isAuth: false,
};

export const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
        saveManager: (state, action) => {
            console.log(action.payload)
            state.manager = action.payload;
            state.isAuth = true;
        },
        removeManager: (state, action) => {
            state.manager= null;
            state.isAuth = false;
        }
        
    },
});

export const { saveManager, removeManager } = managerSlice.actions;

export default managerSlice.reducer;