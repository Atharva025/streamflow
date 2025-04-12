import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaPlay, FaUser, FaSignOutAlt, FaChevronDown, FaSearch } from 'react-icons/fa';

const VideoRender = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const navigate = useNavigate();
    const userMenuRef = React.useRef(null);

    // Get user info from localStorage
    useEffect(() => {
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    // Handle clicks outside profile menu
    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userMenuRef]);

    // Fetch videos
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/videos');

                // Assuming response.data is an array of videos
                setVideos(Array.isArray(response.data) ? response.data : []);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching videos:", err);
                setError("Failed to load videos. Please try again later.");
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const handleUploadClick = () => {
        // Check if user is logged in before navigating
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (isLoggedIn) {
            navigate("/upload");
        } else {
            navigate("/login");
        }
    };

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");

        // Redirect to login page
        navigate("/login");
    };

    // Filter videos based on search term
    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-hidden">
            {/* Subtle Animated Background */}
            <motion.div
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1522842932887-129c1a7ecfaf?fit=crop&w=1920&q=80')",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2 }}
            ></motion.div>

            {/* Navigation/Header */}
            <div className="relative z-20 bg-gray-900 bg-opacity-80 shadow-md">
                <div className="container mx-auto py-3 px-4 flex justify-between items-center">
                    <Link to="/" className="text-blue-400 text-2xl font-bold">StreamFlow</Link>

                    <div className="flex items-center gap-4">
                        {userName ? (
                            <div className="relative" ref={userMenuRef}>
                                <motion.button
                                    className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-full px-4 py-2 border border-gray-700"
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <FaUser className="text-blue-400" />
                                    <span className="font-medium">{userName}</span>
                                    <FaChevronDown className={`transition-transform duration-300 text-gray-400 text-sm ${showProfileMenu ? 'rotate-180' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {showProfileMenu && (
                                        <motion.div
                                            className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white">
                                                <div className="flex items-center">
                                                    <FaUser className="mr-2" />
                                                    Profile
                                                </div>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                                            >
                                                <div className="flex items-center text-red-400 hover:text-red-300">
                                                    <FaSignOutAlt className="mr-2" />
                                                    Sign out
                                                </div>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors">
                                Log in
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Video Grid */}
            <div className="relative z-10 container mx-auto py-10 px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-300 mb-4 md:mb-0">Available Videos</h1>

                    {/* Search Bar */}
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search videos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    {/* Upload Video Button */}
                    <motion.button
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full 
                                  flex items-center justify-center space-x-2 shadow-lg"
                        onClick={handleUploadClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaCloudUploadAlt className="text-xl" />
                        <span className="font-medium">Upload Video</span>
                    </motion.button>
                </div>

                {/* No Results Message */}
                {searchTerm && filteredVideos.length === 0 && (
                    <div className="text-center text-gray-400 mt-8">
                        No videos found matching "{searchTerm}"
                    </div>
                )}

                {videos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-gray-800 bg-opacity-40 rounded-xl">
                        <FaPlay className="text-5xl text-gray-500 mb-4" />
                        <p className="text-gray-400 text-xl mb-6">No videos available yet</p>
                        <motion.button
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full 
                                    flex items-center justify-center space-x-2"
                            onClick={handleUploadClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaCloudUploadAlt className="text-xl" />
                            <span className="font-medium">Upload Your First Video</span>
                        </motion.button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" key={videos.length}>
                        {filteredVideos.map((video) => (
                            <VideoCard key={video.uniqueId || video.id} video={video} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Video Card Component
// Update the VideoCard component

const VideoCard = ({ video }) => {
    const [duration, setDuration] = useState("--:--");
    const videoRef = useRef(null);

    // Extract video duration when component mounts
    useEffect(() => {
        const videoElement = document.createElement("video");

        // Set up the metadata loaded event
        videoElement.onloadedmetadata = () => {
            const videoDurationSeconds = videoElement.duration;
            setDuration(formatDuration(videoDurationSeconds));
        };

        // Set up error handling
        videoElement.onerror = () => {
            console.error("Error loading video metadata");
            setDuration("--:--");
        };

        // Start loading the video to get metadata
        videoElement.preload = "metadata";
        videoElement.src = `/stream/streamVideo/${video.uniqueId}`;

        // Clean up function
        return () => {
            videoElement.onloadedmetadata = null;
            videoElement.onerror = null;
            videoElement.src = "";
        };
    }, [video.uniqueId]);

    return (
        <motion.div
            className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-blue-500 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link to={`/watch?id=${video.uniqueId}&title=${encodeURIComponent(video.title || "")}&description=${encodeURIComponent(video.description || "")}`}>
                <div className="relative">
                    <img
                        src={`/videos/${video.uniqueId}/thumbnail`}
                        alt={video.title || "Video thumbnail"}
                        className="w-full aspect-video object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGgkRAAfg1oyw9-6jmMmtB21wxe-QXMWIuPg&s";
                        }}
                    />

                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {duration}
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-semibold text-blue-300 line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                        {video.description || "No description available"}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

// Make sure this helper function is properly defined
const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default VideoRender;