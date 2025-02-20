import { useState } from "react";
import axios from "axios";

const FileComplaint = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Noise",
    severity: "Mild",
    timestamp: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value, timestamp: new Date().toISOString() });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token"); 
    const res = await axios.post("http://localhost:5000/api/complaints", form, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });

    console.log("Complaint Submitted:", res.data); 
    setForm({ title: "", description: "", type: "Noise", severity: "Mild", timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("Error submitting complaint:", error);
  }
};


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100"
    style={{ 
      backgroundImage: "url('https://media0.giphy.com/media/MPgPVErA30K1YWsAby/giphy.gif?cid=6c09b9529h3jxeczawlh0b658rne0ndaarypraed00tp7yi5&ep=v1_gifs_search&rid=giphy.gif&ct=g')", 
      backgroundRepeat: "no-repeat", 
      backgroundSize: "cover",
      backgroundPosition: "bottom"
    }}
    >
      <h2 className="absolute top-32 text-5xl font-extrabold text-white" style={{ textShadow: "2px 2px 4px black" }}>File a Complaint</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Complaint Title"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the issue..."
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option>Noise</option>
          <option>Cleanliness</option>
          <option>Bills</option>
          <option>Pets</option>
        </select>
        <select
          name="severity"
          value={form.severity}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option>Mild</option>
          <option>Annoying</option>
          <option>Major</option>
          <option>Nuclear</option>
        </select>
        <p className="text-gray-500 text-sm">Timestamp: {new Date(form.timestamp).toLocaleString()}</p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-3"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default FileComplaint;
