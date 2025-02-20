import { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [bestFlatmate, setBestFlatmate] = useState(null);

  useEffect(() => {
    const fetchBestFlatmate = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/complaints/best-flatmate", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBestFlatmate(response.data.bestFlatmate);
      } catch (error) {
        console.error("Error fetching best flatmate:", error.response?.data || error.message);
      }
    };
    fetchBestFlatmate();
  }, []);
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100" style={{backgroundImage:"url('https://i.gifer.com/2vs.gif')",
      backgroundRepeat: "no-repeat", 
      backgroundSize: "cover",
      backgroundPosition: "top"
    }}>
      <h2 className="mb-12 text-5xl font-extrabold text-white" style={{ textShadow: "2px 2px 4px black" }}>Leaderboard</h2>
      {bestFlatmate ? (
        <div className="bg-white p-4 rounded shadow w-96">
          <h3 className="font-bold text-lg">{bestFlatmate.name}</h3>
          <p>Karma Points: {bestFlatmate.karmaPoints}</p>
          <span className="inline-block bg-yellow-400 text-white px-3 py-1 rounded mt-2">
            🏆 Best Flatmate of the Month
          </span>
        </div>
      ) : (
        <p className="text-white text-xl">No best flatmate yet.</p>
      )}
    </div>
  );
};

export default Leaderboard;
