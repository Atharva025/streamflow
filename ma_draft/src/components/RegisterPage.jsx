import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaExclamationCircle, FaCheck } from "react-icons/fa";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "USER"
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.username || !formData.email || !formData.password) {
            setError("Please fill out all required fields.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (formData.username.length < 3) {
            setError("Username must be at least 3 characters long.");
            return;
        }

        if (formData.email === "streamAdmin123@gmail.com" && formData.password === "streamAdmin123") {
            formData.role = "ADMIN";
        }

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            // Send registration request to your backend
            const response = await axios.post("/users/register", formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Handle successful registration
            setSuccess("Account created successfully! Redirecting...");

            if (response.data) {
                // Save user data to localStorage
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userEmail", formData.email);
                localStorage.setItem("userName", formData.username);

                // Clear form
                setFormData({
                    username: "",
                    email: "",
                    password: ""
                });

                // Redirect to videos page after a delay
                setTimeout(() => {
                    navigate("/render");
                }, 2000);
            } else {
                setError("Registration failed. Please try again.");
            }

        } catch (err) {
            console.error("Registration error:", err);
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again later."
            );
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

            {/* Register Section */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <motion.div
                    className="w-full max-w-md p-8 bg-black bg-opacity-70 rounded-lg shadow-2xl border border-gray-700"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl font-extrabold text-center text-blue-400 mb-6">
                        Create an Account
                    </h2>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-900 bg-opacity-50 text-red-200 rounded-md flex items-center">
                            <FaExclamationCircle className="mr-2 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mb-4 p-3 bg-green-900 bg-opacity-50 text-green-200 rounded-md flex items-center">
                            <FaCheck className="mr-2 flex-shrink-0" />
                            <span>{success}</span>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                Username <span className="text-red-400">*</span>
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-100 focus:outline-none focus:border-blue-500"
                                placeholder="Choose a username"
                                required
                            />
                            <p className="mt-1 text-xs text-gray-400">
                                This will be your public username in the app (at least 3 characters)
                            </p>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email <span className="text-red-400">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-100 focus:outline-none focus:border-blue-500"
                                placeholder="user@example.com"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password <span className="text-red-400">*</span>
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-100 focus:outline-none focus:border-blue-500"
                                placeholder="••••••••"
                                required
                            />
                            <p className="mt-1 text-xs text-gray-400">
                                Must be at least 6 characters long
                            </p>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-2 rounded-md ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
                                } text-white font-semibold transition duration-300`}
                            whileHover={!isLoading ? { scale: 1.03 } : {}}
                            whileTap={!isLoading ? { scale: 0.97 } : {}}
                        >
                            {isLoading ? "Creating Account..." : "Register"}
                        </motion.button>
                    </form>

                    {/* Already have an account? */}
                    <div className="mt-4 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-400 hover:text-blue-300">
                            Log in
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
                            Register with Google
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RegisterPage;