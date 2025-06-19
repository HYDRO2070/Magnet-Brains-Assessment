// import { enqueueSnackbar } from "notistack";
// import axios from "../../utils/axios";
// import { saveEmploye } from "../Reducers/employeReducer";

// export const currentEmploye = () => async (dispatch, getState) => {
//   try {
//     const Employe = await axios.get("/employe/currentEmploye");
//     dispatch(saveEmploye(Employe.data.employe));
//   } catch (error) {
//     console.log("current Employe not working");
//   }
// };

// // export const employeSignup = (employe) => async (dispatch, getState) => {
// //   try {
// //     const response = await axios.post("/employe/signup", employe);
// //     dispatch(currentEmploye());
// //     console.log("signup done");
// //   } catch (error) {
// //     enqueueSnackbar("SignUp Successful", { variant: "success" });
// //     console.log("Error in signup", error);
// //   }
// // };

// export const employeSignin = (employe) => async (dispatch, getState) => {
//   try {
//     const response = await axios.post("/employe/signin", employe);
//     dispatch(currentEmploye());
//   } catch (error) {
//     console.log("Error in signin");
//   }
// };

// export const markAttendance = (cordinates) => async (dispatch, getState) => {
//   try {
//     console.log(cordinates);
//     const attendance = await axios.post("/employe/attendance/mark", cordinates);
//     dispatch(currentEmploye());
//     console.log("attendance marked");
//   } catch (error) {
//     console.log("acions not working");
//   }
// };

// export const applyLeave = (data) => async (dispatch, getState) => {
//   try {
//     const leave = await axios.post("/employe/leave", data);
//     dispatch(currentEmploye());
//     console.log("applied for leave");
//   } catch (error) {
//     console.log("error in applying leave");
//   }
// };

// export const uploadDocument = (formData) => async (dispatch) => {
//   try {
//     const response = await axios.post("/employe/document/upload", formData);

//     // Dispatch any necessary action after upload, e.g., refreshing the employee's current details
//     dispatch(currentEmploye());
//     console.log("Document uploaded successfully:", response.data);
//   } catch (error) {
//     console.error("Error uploading document:", error);
//   }
// };
