import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-yellow-500 flex items-center justify-center">
      <div className="text-center bg-white p-10 shadow-xl rounded-lg max-w-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to our Task Management System!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage Task efficiently and effectively.
        </p>

        <div className="space-y-6">
          <button
            onClick={() => navigateTo("/signup")}
            className="w-full px-6 py-3 bg-yellow-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-700 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Signup
          </button>

          <p className="mt-6 text-gray-600">
            Already signed up?{" "}
            <button
              className="text-yellow-600 hover:underline"
              onClick={() => navigateTo("/login")}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
