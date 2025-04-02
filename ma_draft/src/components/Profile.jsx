import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaCalendarAlt, FaVideo, FaEdit, FaChevronLeft, FaSignOutAlt, FaTrash, FaKey } from 'react-icons/fa';

const Profile = () => {
    const [userVideos, setUserVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('videos');
    const [profileStats, setProfileStats] = useState({
        totalVideos: 0,
        totalViews: 0,
        joinDate: 'March 2025'
    });

    const navigate = useNavigate();

    // Get user data from localStorage
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || '';

    // Generate avatar color based on username
    const generateAvatarColor = (username) => {
        const colors = [
            'bg-blue-500', 'bg-purple-500', 'bg-green-500',
            'bg-red-500', 'bg-yellow-500', 'bg-pink-500',
            'bg-indigo-500', 'bg-teal-500'
        ];

        // Simple hash function to get consistent color for same username
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }

        return colors[Math.abs(hash) % colors.length];
    };

    const avatarColor = generateAvatarColor(userName);

    // Fetch user's videos
    useEffect(() => {
        const fetchUserVideos = async () => {
            if (!userEmail) {
                navigate('/login');
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`/videos/uploader/${encodeURIComponent(userEmail)}`);

                if (Array.isArray(response.data)) {
                    setUserVideos(response.data);
                    setProfileStats(prev => ({
                        ...prev,
                        totalVideos: response.data.length,
                        // Simulate total views based on number of videos
                        totalViews: response.data.length * Math.floor(Math.random() * 100 + 20)
                    }));
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching user videos:", err);
                setError("Failed to load your videos. Please try again later.");
                setLoading(false);
            }
        };

        fetchUserVideos();
    }, [userEmail, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        navigate("/login");
    };

    const handleDeleteVideo = async (videoId) => {
        if (window.confirm("Are you sure you want to delete this video? This action cannot be undone.")) {
            try {
                await axios.delete(`/videos/${videoId}`);
                // Update the videos list after deletion
                setUserVideos(userVideos.filter(video => video.uniqueId !== videoId));
                setProfileStats(prev => ({
                    ...prev,
                    totalVideos: prev.totalVideos - 1
                }));
            } catch (err) {
                console.error("Error deleting video:", err);
                alert("Failed to delete video. Please try again.");
            }
        }
    };

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
            {/* Subtle Animated Background */}
            <motion.div
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1592659762303-90081d34b277?fit=crop&w=1920&q=80')",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2 }}
            ></motion.div>

            {/* Navigation Bar */}
            <div className="relative z-20 bg-gray-900 bg-opacity-80 shadow-md">
                <div className="container mx-auto py-3 px-4 flex justify-between items-center">
                    <Link to="/render" className="flex items-center space-x-2">
                        <FaChevronLeft className="text-blue-400" />
                        <span className="text-blue-400 font-medium">Back to Videos</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Profile Content */}
            <div className="relative z-10 container mx-auto py-10 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column (Profile Info) */}
                    <div className="lg:col-span-4">
                        <motion.div
                            className="bg-gray-800 bg-opacity-80 rounded-xl p-6 shadow-lg border border-gray-700"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex flex-col items-center mb-6">
                                {/* User Avatar (first letter of username) */}
                                <div className={`${avatarColor} w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4`}>
                                    {userName.charAt(0).toUpperCase()}
                                </div>

                                <h2 className="text-2xl font-bold text-blue-300">{userName}</h2>
                                <p className="text-gray-400">{userEmail}</p>

                                <div className="mt-4 w-full flex justify-center">
                                    <Link to="/settings" className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-2 rounded-md text-sm">
                                        <FaEdit />
                                        <span>Edit Profile</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Profile Stats */}
                            <div className="border-t border-gray-700 pt-4">
                                <h3 className="text-lg font-semibold text-blue-300 mb-3">Profile Stats</h3>

                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-300">
                                        <FaVideo className="mr-3 text-blue-400" />
                                        <div>
                                            <p className="text-sm">Total Videos</p>
                                            <p className="font-semibold">{profileStats.totalVideos}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-gray-300">
                                        <FaEnvelope className="mr-3 text-blue-400" />
                                        <div>
                                            <p className="text-sm">Email</p>
                                            <p className="font-semibold">{userEmail}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-gray-300">
                                        <FaCalendarAlt className="mr-3 text-blue-400" />
                                        <div>
                                            <p className="text-sm">Joined</p>
                                            <p className="font-semibold">{profileStats.joinDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column (Videos/Settings) */}
                    <div className="lg:col-span-8">
                        {/* Tab Navigation */}
                        <div className="flex border-b border-gray-700 mb-6">
                            <button
                                className={`px-4 py-2 font-medium ${activeTab === 'videos' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                                onClick={() => setActiveTab('videos')}
                            >
                                My Videos
                            </button>
                            <button
                                className={`px-4 py-2 font-medium ${activeTab === 'settings' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                Account Settings
                            </button>
                        </div>

                        {/* Content Based on Active Tab */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'videos' && (
                                <motion.div
                                    key="videos"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {loading ? (
                                        <div className="flex justify-center py-12">
                                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                        </div>
                                    ) : error ? (
                                        <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-200 p-4 rounded-md">
                                            {error}
                                        </div>
                                    ) : userVideos.length === 0 ? (
                                        <div className="text-center py-12 bg-gray-800 bg-opacity-70 rounded-xl border border-gray-700">
                                            <FaVideo className="mx-auto text-4xl text-gray-500 mb-3" />
                                            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Videos Yet</h3>
                                            <p className="text-gray-400 mb-4">You haven't uploaded any videos yet.</p>
                                            <Link
                                                to="/upload"
                                                className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors"
                                            >
                                                Upload Your First Video
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {userVideos.map((video) => (
                                                <div
                                                    key={video.uniqueId}
                                                    className="bg-gray-800 bg-opacity-80 rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-lg"
                                                >
                                                    <Link to={`/watch?id=${video.uniqueId}`}>
                                                        <div className="relative aspect-video">
                                                            <img
                                                                src={`/videos/${video.uniqueId}/thumbnail`}
                                                                alt={video.title || "Video thumbnail"}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "https://via.placeholder.com/640x360.png?text=No+Thumbnail";
                                                                }}
                                                            />
                                                        </div>
                                                    </Link>

                                                    <div className="p-4">
                                                        <div className="flex justify-between items-start">
                                                            <Link to={`/watch?id=${video.uniqueId}`} className="block flex-1">
                                                                <h3 className="text-lg font-semibold text-blue-300 hover:text-blue-200 mb-1 line-clamp-2">
                                                                    {video.title || "Untitled Video"}
                                                                </h3>
                                                            </Link>

                                                            <button
                                                                onClick={() => handleDeleteVideo(video.uniqueId)}
                                                                className="text-red-400 hover:text-red-300 p-1"
                                                                title="Delete video"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </div>

                                                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                                                            {video.description || "No description provided"}
                                                        </p>

                                                        <div className="flex space-x-2">
                                                            <Link
                                                                to={`/edit-video/${video.uniqueId}`}
                                                                className="text-xs bg-blue-900 hover:bg-blue-800 text-blue-200 px-3 py-1 rounded"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <Link
                                                                to={`/watch?id=${video.uniqueId}`}
                                                                className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded"
                                                            >
                                                                Watch
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'settings' && (
                                <motion.div
                                    key="settings"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-gray-800 bg-opacity-80 rounded-xl p-6 border border-gray-700"
                                >
                                    <h3 className="text-xl font-semibold text-blue-300 mb-6">Account Settings</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                value={userName}
                                                readOnly
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={userEmail}
                                                readOnly
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                                            />
                                        </div>

                                        <div className="pt-4 border-t border-gray-700">
                                            <h4 className="text-lg font-medium text-red-400 mb-4">Danger Zone</h4>

                                            <div className="space-y-4">
                                                <button
                                                    className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center"
                                                    onClick={() => alert("Password reset functionality would go here")}
                                                >
                                                    <FaKey className="mr-2" />
                                                    Reset Password
                                                </button>

                                                <button
                                                    className="w-full bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center"
                                                    onClick={() => {
                                                        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                                                            alert("Account deletion would be processed here");
                                                        }
                                                    }}
                                                >
                                                    <FaTrash className="mr-2" />
                                                    Delete Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;