import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import complaintRoutes from "./routes/complaint.js";
import cron from "node-cron";
import Complaint from "./models/Complaint.js";

cron.schedule("0 0 * * *", async () => {
  const now = new Date();
  await Complaint.updateMany(
    { voteExpiry: { $lte: now }, archived: false },
    { $set: { archived: true } }
  );
  console.log("Archived complaints with high downvotes.");
});

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
