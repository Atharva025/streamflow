import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VideoUploadPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    // Set description character limit
    const maxDescriptionLength = 500;

    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            setEmail(userEmail);
        } else {
            // If no email is found, the user might not be logged in
            // Optionally redirect to login page
            // navigate("/login");
        }
    }, []);

    // Add this after handleFileChange function
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);

            // Create a preview URL for the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeThumbnail = () => {
        setThumbnail(null);
        setThumbnailPreview(null);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        const text = e.target.value;
        // Only update if under the character limit
        if (text.length <= maxDescriptionLength) {
            setDescription(text);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !title) {
            setError("Please provide a title and select a video file");
            return;
        }

        if (description.length > maxDescriptionLength) {
            setError(`Description must be ${maxDescriptionLength} characters or less`);
            return;
        }

        try {
            setUploading(true);
            setError("");
            setMessage("");
            setUploadProgress(0);

            // Create form data object to match your Postman request
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("email", email);

            // Important: Use the same field name "file" as in your Postman request
            formData.append("file", file);

            // Add the thumbnail if it exists
            if (thumbnail) {
                formData.append("thumbnail", thumbnail);
            }

            console.log("Submitting with file:", file);
            console.log("Thumbnail:", thumbnail ? thumbnail.name : "None");
            console.log("Form data entries:");
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + (pair[0] === 'file' || pair[0] === 'thumbnail' ? 'File object' : pair[1]));
            }

            // Make API call to your backend
            const response = await axios.post("/videos/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // Do not set any other headers that might interfere
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                }
            });

            // Check response and handle accordingly
            if (response.data) {
                const videoId = response.data.id || response.data.videoId;
                setMessage(`Video "${title}" uploaded successfully!`);

                // Reset form after successful upload
                setTitle("");
                setDescription("");
                setEmail("");
                setFile(null);
                setThumbnail(null);
                setThumbnailPreview(null);
                setUploadProgress(0);

                // Optional: Navigate to the video page after a delay
                // setTimeout(() => {
                //     navigate(`/watch?id=${videoId}`);
                // }, 2000);
            }

        } catch (err) {
            console.error("Error uploading video:", err);
            // More detailed error message for debugging
            let errorMsg = "Failed to upload video. Please try again.";
            if (err.response) {
                errorMsg = `Server error (${err.response.status}): ${err.response.data.message || err.response.data || errorMsg}`;
                console.log("Error response data:", err.response.data);
            } else if (err.request) {
                errorMsg = "No response received from server. Please check your connection.";
            } else {
                errorMsg = `Request error: ${err.message}`;
            }
            setError(errorMsg);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-hidden">
            {/* Animated Background */}
            <motion.div
                className="absolute inset-0 opacity-25 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1584994291545-248f8be9cfce?fit=crop&w=1920&q=80')",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2 }}
            ></motion.div>

            {/* Upload Section */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <motion.div
                    className="w-full max-w-md p-10 bg-black bg-opacity-70 rounded-lg shadow-2xl border border-gray-700"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                >
                    <h2 className="text-3xl font-extrabold text-center text-blue-400 mb-6">
                        Upload Your Video
                    </h2>

                    {message && (
                        <div className="mb-4 p-3 bg-green-900 bg-opacity-50 text-green-200 rounded-md">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 bg-red-900 bg-opacity-50 text-red-200 rounded-md">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Video Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Video Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="My Awesome Video"
                                className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-100 
                                placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-100 
                                placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Video Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows="4"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Tell viewers more about your video..."
                                maxLength={maxDescriptionLength}
                                className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 
                                text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            ></textarea>
                            <p className="text-xs text-gray-400 text-right mt-1">
                                {description.length}/{maxDescriptionLength} characters
                            </p>
                        </div>

                        {/* Drag & Drop / File Upload Section */}
                        <div>
                            <label
                                htmlFor="videoFile"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Choose Video
                            </label>
                            <div className="border-2 border-dashed border-gray-600 rounded-md mt-1 p-4 flex flex-col items-center justify-center h-24 text-sm text-gray-400 transition hover:border-blue-500 relative">
                                <input
                                    id="videoFile"
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-10"
                                />
                                <p className="mb-1">{file ? file.name : "Drag & drop or click to upload"}</p>
                                <p className="text-xs text-gray-500">MP4, MOV, AVI</p>
                            </div>
                        </div>

                        {/* Thumbnail Upload Section */}
                        <div>
                            <label
                                htmlFor="thumbnailFile"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Upload Thumbnail (Optional)
                            </label>
                            <div className="border-2 border-dashed border-gray-600 rounded-md mt-1 p-4 flex flex-col items-center justify-center h-24 text-sm text-gray-400 transition hover:border-blue-500 relative">
                                <input
                                    id="thumbnailFile"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleThumbnailChange}
                                    className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-10"
                                />
                                {thumbnailPreview ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={thumbnailPreview}
                                            alt="Thumbnail preview"
                                            className="h-full mx-auto object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeThumbnail}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                            title="Remove thumbnail"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <p className="mb-1">{thumbnail ? thumbnail.name : "Drag & drop or click to upload thumbnail"}</p>
                                        <p className="text-xs text-gray-500">JPG, PNG, GIF (Max 5MB)</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Upload Progress */}
                        {uploading && (
                            <div className="w-full bg-gray-800 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                                <p className="text-xs text-gray-400 text-center mt-1">
                                    {uploadProgress}% uploaded
                                </p>
                            </div>
                        )}

                        {/* Upload Button */}
                        <motion.button
                            type="submit"
                            disabled={uploading}
                            className={`w-full py-2 mt-4 rounded-md ${uploading
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-500"
                                } text-white font-semibold transition duration-300`}
                            whileHover={!uploading ? { scale: 1.03 } : {}}
                            whileTap={!uploading ? { scale: 0.97 } : {}}
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default VideoUploadPage;