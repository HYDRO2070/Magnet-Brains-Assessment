import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { employeSignup } from "../../Services/apiservices";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const { username, email, password, role } = formData;

    if (!username || !email || !password || !role) {
      toast.warning("All fields are required!");
      return;
    }
    try {
      const response = await employeSignup(formData);
      if (response.status === 200) {
        toast.success("Sign Up Successful!");
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      toast.error("Signup failed. Try again!");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-yellow-500 flex items-center justify-center p-4">
      <div className="bg-white p-6 shadow-xl rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Signup</h1>

        <form onSubmit={SubmitHandler}>
          <div className="mb-3">
            <label className="block text-gray-700 font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Role
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                  className="form-radio text-yellow-600"
                />
                <span className="ml-2 text-gray-700">User</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                  className="form-radio text-yellow-600"
                />
                <span className="ml-2 text-gray-700">Admin</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-yellow-600 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
