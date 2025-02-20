import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div 
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
      style={{ 
        backgroundImage: "url('https://i.pinimg.com/originals/85/42/dd/8542dd32f80c4ed288e8a32dd4ed0adb.gif')", 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover",
        backgroundPosition: "left"
      }}
    >
      <h1 className="text-4xl font-extrabold text-white mb-10" style={{ textShadow: "2px 2px 4px black" }}>
        Welcome to QuirkyRoomie
      </h1>
      
      <div className="grid grid-cols-3 gap-8 mb-6">
        <button
          onClick={() => navigate("/file-complaint")}
          className="w-64 h-40 bg-blue-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-blue-600 flex items-center justify-center"
        >
          File a Complaint
        </button>
        <button
          onClick={() => navigate("/complaint-list")}
          className="w-64 h-40 bg-green-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-green-600 flex items-center justify-center"
        >
          View Complaints
        </button>
        <button
          onClick={() => navigate("/leaderboard")}
          className="w-64 h-40 bg-purple-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-purple-600 flex items-center justify-center"
        >
          Leaderboard
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="w-48 bg-red-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
