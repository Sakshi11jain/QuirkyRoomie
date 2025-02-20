import { useState } from "react";
import axios from "axios";

const ComplaintCard = ({ complaint, fetchComplaints }) => {
  const [upvotes, setUpvotes] = useState(complaint.upvotes);
  const [downvotes, setDownvotes] = useState(complaint.downvotes);
  const [resolved, setResolved] = useState(complaint.resolved);

  const handleVote = async (type) => {
    if (resolved) return;
    try {
      const url = `http://localhost:5000/api/complaints/${complaint._id}/${type}`;
      await axios.post(url, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

      if (type === "upvote") setUpvotes((prev) => prev + 1);
      if (type === "downvote") setDownvotes((prev) => prev + 1);

      fetchComplaints();
    } catch (error) {
      console.error("Voting error:", error);
    }
  };

  const markAsResolved = async () => {
    try {
      await axios.put(`http://localhost:5000/api/complaints/${complaint._id}/resolve`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setResolved(true);
      setUpvotes(0);
      setDownvotes(0);
    } catch (error) {
      console.error("Error marking complaint as resolved:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-full">
      <h3 className="text-lg font-semibold">{complaint.title}</h3>
      <p className="text-gray-600">{complaint.description}</p>
      <div className="flex justify-between items-center mt-3">
        <button onClick={() => handleVote("upvote")} disabled={resolved} className={`px-3 py-1 rounded ${resolved ? "bg-gray-400" : "bg-green-500 text-white"}`}>
          👍 {upvotes}
        </button>
        <button onClick={markAsResolved} className={`px-3 py-1 rounded ${resolved ? "bg-green-500 text-white" : "bg-blue-500 text-white"}`}>
          ✔ Resolved
        </button>
        <button onClick={() => handleVote("downvote")} disabled={resolved} className={`px-3 py-1 rounded ${resolved ? "bg-gray-400" : "bg-red-500 text-white"}`}>
          👎 {downvotes}
        </button>
      </div>
    </div>
  );
};

export default ComplaintCard;
