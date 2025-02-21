import { useState, useEffect } from "react";
import axios from "axios";
import ComplaintCard from "./ComplaintCard";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [topComplaint, setTopComplaint] = useState(null);
  const [punishment, setPunishment] = useState("");

  const punishments = [
    "Didn’t clean the dishes? You’re making chai for everyone for a week.",
    "Blasted loud music at 2 AM? You owe everyone samosas."
  ];

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/complaints", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(res.data);

      if (res.data.length > 0) {
        const highestUpvoted = res.data.reduce((prev, current) => 
          prev.upvotes > current.upvotes ? prev : current
        );
        setTopComplaint(highestUpvoted);

        if (highestUpvoted.upvotes >= 10) {
          setPunishment(punishments[Math.floor(Math.random() * punishments.length)]);
        } else {
          setPunishment("");
        }
      } else {
        setTopComplaint(null);
        setPunishment("");
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="p-6 bg-pink-100">
      {topComplaint ? (
        <div className="bg-yellow-300 p-4 rounded-md text-center mb-4">
          <h2 className="text-xl font-bold">Flatmate Problem of the Week</h2>
          <p className="text-gray-700">{topComplaint.title}</p>
          {topComplaint.upvotes >= 10 && (
            <p className="text-red-600 font-semibold mt-2">Punishment: {punishment}</p>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 mb-4">No complaints yet.</div>
      )}
      {complaints.map((c) => (
        <ComplaintCard key={c._id} complaint={c} fetchComplaints={fetchComplaints} />
      ))}
    </div>
  );
};

export default ComplaintList;
