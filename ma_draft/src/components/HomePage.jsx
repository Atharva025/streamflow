import { Link } from "react-router-dom";
import { FaPlay, FaUpload, FaBolt, FaRocket, FaGlobe, FaShieldAlt, FaChevronRight } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="w-full py-6 px-8 flex justify-between items-center border-b border-gray-800/50">
        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
          StreamFlow
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Sign In</Link>
          <Link to="/register" className="text-gray-300 hover:text-white transition-colors">Create Account</Link>
          <Link to="/login" className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-20 md:py-28 px-8 text-center relative">
        {/* Optional subtle background pattern */}

        <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
          <span className="text-white">Welcome to </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
            StreamFlow
          </span>
        </h1>

        <p className="mt-6 text-xl text-gray-300 max-w-2xl leading-relaxed">
          A simple and efficient platform to upload, share, and watch videos with ease.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/login"
            className="flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-colors shadow-lg"
          >
            <FaPlay className="mr-2" />
            Start Watching
          </Link>
          <Link
            to="/login"
            className="flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-colors shadow-lg"
          >
            <FaUpload className="mr-2" />
            Upload Content
          </Link>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="relative h-24 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute w-full h-full">
          <path fill="#111827" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Feature Highlights */}
      <div className="py-16 px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
            Simple and Straightforward
          </h2>

          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16">
            Our platform focuses on the basics - making it easy to register, upload videos, and watch content.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
              <div className="w-14 h-14 mb-5 rounded-lg bg-blue-900/30 flex items-center justify-center text-blue-400">
                <FaPlay className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-blue-400 mb-3">Watch Videos</h3>
              <p className="text-gray-400">
                Browse and watch videos uploaded by other users on our streamlined platform.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20">
              <div className="w-14 h-14 mb-5 rounded-lg bg-purple-900/30 flex items-center justify-center text-purple-400">
                <FaUpload className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-purple-400 mb-3">Upload Content</h3>
              <p className="text-gray-400">
                Easily upload your videos and share them with the community in just a few clicks.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
              <div className="w-14 h-14 mb-5 rounded-lg bg-green-900/30 flex items-center justify-center text-green-400">
                <FaShieldAlt className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-green-400 mb-3">User Accounts</h3>
              <p className="text-gray-400">
                Register an account to unlock all features and manage your uploaded content.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="flex justify-center items-center text-sm text-gray-500">
          <p className="text-center">
            Made with <span className="text-red-500">❤️</span> by Atharva Joshi, Parth Jhaveri, Sahaj Upadhyay, Yash Talati
          </p>
        </div>
      </footer>

      {/* Add a CSS class for the background grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;