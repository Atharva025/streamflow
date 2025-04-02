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
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
          <span className="text-white">The Future of </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
            Video Streaming
          </span>
        </h1>

        <p className="mt-6 text-xl text-gray-300 max-w-2xl leading-relaxed">
          Stream and share your content globally with blazing speed, stunning quality,
          and an experience that puts you in control.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link to="/login">
            <button className="flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-colors shadow-lg">
              <FaPlay className="mr-2" />
              Start Watching
            </button>
          </Link>
          <Link to="/login">
            <button className="flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-colors shadow-lg">
              <FaUpload className="mr-2" />
              Upload Content
            </button>
          </Link>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="relative h-24 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute w-full h-full">
          <path fill="#111827" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Feature Highlights */}
      <div className="py-16 px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
            Redefining Video Experience
          </h2>

          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16">
            Our platform delivers cutting-edge features designed for creators and viewers who demand the very best streaming experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
              <div className="w-14 h-14 mb-5 rounded-lg bg-blue-900/30 flex items-center justify-center text-blue-400">
                <FaBolt className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-blue-400 mb-3">Ultra-Fast Streaming</h3>
              <p className="text-gray-400">
                Experience real-time, ultra-low-latency video delivery powered by cutting-edge technology.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20">
              <div className="w-14 h-14 mb-5 rounded-lg bg-purple-900/30 flex items-center justify-center text-purple-400">
                <FaRocket className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-purple-400 mb-3">Adaptive Quality</h3>
              <p className="text-gray-400">
                Smart quality adjustments based on your network conditions, ensuring smooth playback everywhere.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
              <div className="w-14 h-14 mb-5 rounded-lg bg-blue-900/30 flex items-center justify-center text-blue-400">
                <FaGlobe className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-blue-400 mb-3">Global Distribution</h3>
              <p className="text-gray-400">
                Reach audiences worldwide with our globally distributed CDN that minimizes buffering.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
              <div className="w-14 h-14 mb-5 rounded-lg bg-green-900/30 flex items-center justify-center text-green-400">
                <FaShieldAlt className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-green-400 mb-3">Secure Content</h3>
              <p className="text-gray-400">
                Industry-leading security protocols protect your content and ensure privacy for all viewers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="py-20 px-8 bg-gradient-to-r from-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Optional decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
        <div className="absolute -bottom-14 -left-14 w-28 h-28 rounded-full bg-blue-600/20 blur-xl"></div>
        <div className="absolute -top-14 -right-14 w-28 h-28 rounded-full bg-indigo-600/20 blur-xl"></div>

        <div className="max-w-4xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to transform your viewing experience?</h3>
              <p className="text-blue-100">
                Join our platform and take control of your content today.
              </p>
            </div>

            <Link to="/register">
              <button className="group font-semibold px-8 py-4 text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg transition-colors flex items-center">
                Create Free Account
                <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 mb-4">
                StreamFlow
              </h3>
              <p className="text-gray-400 text-sm">
                The next generation platform for video streaming and content sharing.
              </p>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} StreamFlow. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
            </div>
          </div>
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