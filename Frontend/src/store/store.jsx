import { configureStore } from "@reduxjs/toolkit";
import employeReducer from "./Reducers/employeReducer"
import managerReducer from "./Reducers/managerReducer"
import allemployeReducer from "./Reducers/allemployeReducer"

export const store = configureStore({
    reducer: {
        employeReducer,
        managerReducer,
        allemployeReducer,
    },
});
