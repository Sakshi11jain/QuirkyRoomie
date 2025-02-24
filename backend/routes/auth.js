import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  const { name, email, password, flatCode } = req.body;

  if (!name || !email || !password || !flatCode) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    flatCode,
  });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id, flatCode: user.flatCode }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token, user: { name: user.name, email: user.email, flatCode: user.flatCode } });
});

export default router;
