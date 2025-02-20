import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 "  style={{ 
      backgroundImage: "url('https://static1.srcdn.com/wordpress/wp-content/uploads/2020/02/Friends-Central-Perk-Cropped.jpg')", 
      backgroundRepeat: "no-repeat", 
      backgroundSize: "cover",
      backgroundPosition: "left"
    }}>
      <h1 className="absolute top-32 text-5xl font-extrabold text-white" style={{ textShadow: "2px 2px 4px black" }}>
  QuirkyRoomie
</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
