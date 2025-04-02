import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import VideoUploadPage from "./components/VideoUploadPage";
import VideoStreamPage from "./components/VideoStreamPage";
import VideoRender from "./components/VideoRender";
import Profile from "./components/Profile";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upload" element={<VideoUploadPage />} />
        <Route path="/watch" element={<VideoStreamPage key={window.location.search} />} />
        <Route path="/render" element={<VideoRender />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
