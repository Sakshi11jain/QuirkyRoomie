import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FileComplaint from "./pages/FileComplaint";
import Leaderboard from "./pages/Leaderboard";
import ComplaintList from "./pages/ComplaintList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/file-complaint" element={<FileComplaint />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/complaint-list" element={<ComplaintList />} />
      </Routes>
    </Router>
  );
}

export default App;
