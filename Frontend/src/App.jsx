import Dashboard from "./component/Dashboard";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import LoggedInDashboard from "./component/Navbar/LoggedInDashboard";
import Users from "./component/Navbar/Users";
import AssignTask from "./component/Navbar/AssignTask";
import Files from "./component/Files/Files";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<LoggedInDashboard />} />
        <Route path="/dashboard/assigntask" element={<AssignTask />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/files" element={<Files />} />

        {/* <Route path="/employe/attendance" element={<EmployeAttendance />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/apply-leave" element={<ApplyLeave />} />
        <Route path="/overtime" element={<EmployeeOvertime />} /> */}
        {/* manager */}
        {/* <Route
          path="/approve-leave/:employeeId/:leaveId"
          element={<Approveleave />}
        />
        <Route
          path="/approve-leave/:employeeId/:leaveId"
          element={<Approveleave />}
        />
        <Route path="/mark-review/:employeeId" element={<Markreview />} />
        <Route path="/upload-documents" element={<Documents />} /> */}
      </Routes>
    </div>
  );
};

export default App;
