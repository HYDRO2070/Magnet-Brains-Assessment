import { Link, useNavigate } from "react-router-dom";
import { employeSignout, loggedInUsers } from "../../Services/apiservices";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const handleLogout = async () => {
    try {
      const logout = await employeSignout();
      if (logout.status == 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loggedInUserobj = async () => {
    try {
      const response = await loggedInUsers();
      if (response.status === 200) {
        setLoggedInUser(response?.data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loggedInUserobj();
  }, []);
  return (
    <div className="min-h-fit flex flex-col ">
      <nav className="bg-gray-800 p-4 shadow-lg text-white">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-32">
            <li>
              <Link to="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
            </li>
            {loggedInUser?.role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/assigntask"
                    className="hover:text-gray-300"
                  >
                    AssignTask
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/users" className="hover:text-gray-300">
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/login"
                onClick={handleLogout}
                className="hover:text-gray-300"
              >
                Signout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
