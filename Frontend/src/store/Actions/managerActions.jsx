// import axios from "../../utils/axios";
// import { saveManager } from "../Reducers/managerReducer";
// import { allemploye } from "./allemployeactions";
// import { currentEmploye } from "./employeActions";

// export const currentManager = () => async (dispatch, getState) => {
//     try {
//         const Manager = await axios.get("/manager/currentManager")
//         dispatch(saveManager(Manager.data));
//     } catch (error) {
//         console.log("current Manager not working")
//     }
// };

// export const managerSignup = (manager) => async (dispatch, getState) => {
//     try {
//        const response=  await axios.post("/manager/signup", manager);
//         dispatch(currentManager());
//         console.log("signup done")
//     } catch (error) {
//         console.log("Error in signup");
//     }
// };

// export const managerSignin = (manager) => async (dispatch, getState) => {
//     try {
//        const response=  await axios.post("/manager/signin", manager);
//         dispatch(currentManager());
//     } catch (error) {
//         console.log("Error in signin");
//     }
// };

// export const approveLeave = (dets) => async (dispatch, getState) => {
//     console.log(dets)
//     try {
//        const response=  await axios.put("/manager/leave/manage", dets);
//         dispatch(currentManager());
//         dispatch(allemploye())
//     } catch (error) {
//         console.log("Error in signin");
//     }
// };

// export const markReview = ({id, data}) => async (dispatch, getState) => {
//     try {
//         console.log(data)
//        const response=  await axios.post(`/manager/review/${id}`, data);
//         dispatch(currentManager());
//         dispatch(currentEmploye())
//     } catch (error) {
//         console.log("Error in signin");
//     }
// };
