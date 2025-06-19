import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { employeSignin } from "../../Services/apiservices";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.warning("Email and Password are required!");
      return;
    }

    try {
      const response = await employeSignin(formData);
      if (response.status === 200) {
        toast.success("Login Successful");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-yellow-500 flex items-center justify-center p-4">
      <div className="bg-white p-6 shadow-xl rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

        <form onSubmit={SubmitHandler}>
          {/* Email */}
          <div className="mb-3">
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-yellow-600 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
