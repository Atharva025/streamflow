import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // Fetch users from the database when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Check if user exists in the fetched users list
      const user = users.find(u =>
        u.username === username && u.password === password
      );

      if (user) {
        // User found, store login state
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", user.email || "");
        localStorage.setItem("userName", user.username);

        // Redirect to all videos page
        navigate("/render");
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Subtle Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1584994291545-248f8be9cfce?fit=crop&w=1920&q=80')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      ></motion.div>

      {/* Login Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          className="w-full max-w-md p-8 bg-black bg-opacity-70 rounded-lg shadow-2xl border border-gray-700"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-extrabold text-center text-blue-400 mb-6">
            Log In
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900 bg-opacity-50 text-red-200 rounded-md flex items-center">
              <FaExclamationCircle className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-600 rounded bg-gray-800 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Forgot password?
                </a>
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-md ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
                } text-white font-semibold transition duration-300`}
              whileHover={!isLoading ? { scale: 1.03 } : {}}
              whileTap={!isLoading ? { scale: 0.97 } : {}}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="mx-4 text-sm text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          {/* Google Auth Button */}
          <div className="text-center">
            <motion.button
              type="button"
              className="w-full py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-500 transition duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png"
                alt="Google logo"
                className="w-5 h-5 mr-2"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              Login with Google
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;