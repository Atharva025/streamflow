import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaThumbsUp, FaShare, FaBookmark, FaBell, FaCopy, FaLink, FaTwitter, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BiSend } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { format } from "date-fns";

const VideoStreamPage = () => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id'); // Get 'id' from URL query params
  const urlTitle = searchParams.get('title');
  const urlDescription = searchParams.get('description');
  const [video, setVideo] = useState({
    title: urlTitle || "Default Video Title",
    description: urlDescription || "Default Video Description",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const sharePopupRef = useRef(null);

  // Add these imports if not already present


  // Add these state variables to your component
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [currentUser] = useState({
    name: "Guest User", // Replace with actual user name when you have authentication
    avatar: "https://api.dicebear.com/6.x/initials/svg?seed=Guest" // Placeholder avatar
  });

  // Add these functions to your component
  const fetchComments = async () => {
    try {
      setCommentLoading(true);
      // Replace with actual API endpoint when you implement backend
      // const response = await axios.get(`/videos/${id}/comments`);
      // setComments(response.data);

      // For now, using dummy data
      setTimeout(() => {
        setComments([
          {
            id: "c1",
            user: { name: "Alex Johnson", avatar: "https://api.dicebear.com/6.x/initials/svg?seed=AJ" },
            text: "This video was really informative! Thanks for sharing.",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            likes: 5
          },
          {
            id: "c2",
            user: { name: "Maria Garcia", avatar: "https://api.dicebear.com/6.x/initials/svg?seed=MG" },
            text: "I've been looking for content like this for ages. Great explanation!",
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            likes: 12
          }
        ]);
        setCommentLoading(false);
      }, 800);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setCommentLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // Will need to integrate with your backend API
      // For now, just add to local state
      const newCommentObj = {
        id: `c${Date.now()}`,
        user: currentUser,
        text: newComment,
        timestamp: new Date().toISOString(),
        likes: 0
      };

      setComments(prev => [newCommentObj, ...prev]);
      setNewComment("");

      // When backend is ready:
      // await axios.post(`/videos/${id}/comments`, { text: newComment });
      // await fetchComments();
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setComments(prev => prev.filter(comment => comment.id !== commentId));

      // When backend is ready:
      // await axios.delete(`/videos/${id}/comments/${commentId}`);
      // await fetchComments();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const formatCommentDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

      if (diffHours < 1) return "Just now";
      if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;

      return format(date, "MMM dd, yyyy");
    } catch (e) {
      return "Unknown date";
    }
  };

  // Add this useEffect to load comments when component mounts or video ID changes
  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sharePopupRef.current && !sharePopupRef.current.contains(event.target)) {
        setShowSharePopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sharePopupRef]);

  const copyToClipboard = () => {
    const linkToCopy = `${window.location.origin}/watch?id=${id}&title=${encodeURIComponent(urlTitle || "")}&description=${encodeURIComponent(urlDescription || "")}`;

    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        alert("Link copied to clipboard!");
        setShowSharePopup(false);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

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

  useEffect(() => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.load(); // Force video reload
      if (videoElement.autoplay) {
        videoElement.play();
      }
    }
  }, [id]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/videos/${id}`);
        console.log(id);
        setVideo(response.data);
        console.log(response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("Failed to load video data");
        setLoading(false);
      }
    };

    if (id) {
      fetchVideoDetails();
    } else {
      setError("No video ID provided");
      setLoading(false);
    }
  }, [id]);

  if (error || !video) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
        <div className="text-center p-8 bg-black bg-opacity-60 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
          <p>{error || "Failed to load video"}</p>
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

      {/* Video Stream Container */}
      <div className="relative z-10 container mx-auto pt-6 pb-10 px-4">
        {/* Primary Content */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main Video Section */}
          <motion.div
            className="w-full xl:w-3/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Video Player - Elevated with shadow */}
            <div className="rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)] mb-5">
              <video
                className="w-full aspect-video object-cover"
                controls
              >
                <source src={`http://localhost:8080/stream/streamVideo/${id}`} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>

            {/* Video Info Section */}
            <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              {/* Title & Views */}
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-blue-300 mb-2">{urlTitle}</h1>
                <div className="flex items-center text-sm text-gray-400">
                  <span>24,531 views</span>
                  <span className="mx-2">•</span>
                  <span>Posted 3 days ago</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaBell className="text-sm" />
                  <span>Subscribe</span>
                </motion.button>

                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaThumbsUp className="text-sm" />
                  <span>Like</span>
                </motion.button>

                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full transition-all relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSharePopup(true)}
                >
                  <FaShare className="text-sm" />
                  <span>Share</span>
                </motion.button>

                {/* Share Popup */}
                {showSharePopup && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                      ref={sharePopupRef}
                      className="bg-gray-900 rounded-xl border border-gray-700 p-6 max-w-md w-full mx-4"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-blue-400">Share this video</h3>
                        <button
                          onClick={() => setShowSharePopup(false)}
                          className="text-gray-400 hover:text-white"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-3 mb-4 flex items-center">
                        <div className="text-gray-300 truncate flex-1 mr-2 text-sm">
                          {`${window.location.origin}/watch?id=${id}`}
                        </div>
                        <button
                          onClick={copyToClipboard}
                          className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md flex items-center"
                        >
                          <FaCopy className="mr-2" />
                          Copy
                        </button>
                      </div>



                      <p className="text-sm text-gray-400 text-center">
                        Sharing this link will allow others to watch this video
                      </p>
                    </motion.div>
                  </div>
                )}


              </div>

              {/* Description */}
              <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">
                  {urlDescription}
                </p>
              </div>
            </div>


          </motion.div>

          {/* Sidebar - Recommended Videos */}
          <motion.div
            className="w-full xl:w-1/4 bg-black bg-opacity-60 backdrop-blur-sm rounded-xl border border-gray-800 p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center">
              <FaPlay className="mr-2 text-sm" /> Up Next
            </h3>

            <div className="space-y-4">
              {/* Video Recommendation Cards */}

              {videos.filter(video => video.uniqueId !== id)
                .map((video) => (
                  <div key={video.id || video.uniqueId} className="flex items-center bg-gray-800 bg-opacity-50 rounded-lg p-3 hover:bg-gray-700 transition-all cursor-pointer">
                    <Link
                      to={`/watch?id=${video.uniqueId}&title=${encodeURIComponent(video.title || "")}&description=${encodeURIComponent(video.description || "")}`}
                      className="w-full flex items-center"
                    >
                      <img
                        src={`/videos/${video.uniqueId}/thumbnail`}
                        alt={video.title || "Video thumbnail"}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop if fallback also fails
                          e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGgkRAAfg1oyw9-6jmMmtB21wxe-QXMWIuPg&s";
                        }}
                      />
                      <div className="flex flex-col space-y-1.5 py-0.5 flex-1 overflow-hidden">
                        <h4 className="text-sm font-semibold text-blue-300 line-clamp-2 leading-snug hover:text-blue-200 transition-colors">
                          {video.title || "Untitled Video"}
                        </h4>
                        <div className="flex flex-col">
                          <p className="text-xs text-gray-500 line-clamp-1 leading-relaxed">
                            {video.description || "No description available"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>


          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VideoStreamPage;