import express from "express";
import Complaint from "../models/Complaint.js";
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// File a complaint
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, type, severity } = req.body;

    if (!title || !description || !type || !severity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComplaint = new Complaint({
      title,
      description,
      complaintType: type,
      severity,
      user: req.user.userId,
      flatCode: req.user.flatCode,
      timestamp: new Date(),
      upvotes: 0,
      downvotes: 0,
      upvotedBy: [],
      downvotedBy: [],
      voteExpiry: null
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint filed successfully", complaint: newComplaint });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all complaints of the user's flat
router.get("/", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({ flatCode: req.user.flatCode })
      .populate("user", "name email");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a complaint (Only the user who created it can delete)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    if (complaint.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to delete this complaint" });
    }

    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: "Complaint deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Upvote a complaint (Prevents duplicate votes)
router.post("/:id/upvote", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.upvotes += 1;
    await complaint.save();
    res.json({ success: true, upvotes: complaint.upvotes });
  } catch (error) {
    res.status(500).json({ message: "Error upvoting", error: error.message });
  }
});


// Downvote a complaint (Prevents duplicate votes & auto-archives)
router.post("/:id/downvote", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.downvotes += 1;
    await complaint.save();
    res.json({ success: true, downvotes: complaint.downvotes });
  } catch (error) {
    res.status(500).json({ message: "Error downvoting", error: error.message });
  }
});

// Get top complaint (Excludes expired complaints)
router.get("/top-complaint", authMiddleware, async (req, res) => {
  try {
    const topComplaint = await Complaint.findOne({
      flatCode: req.user.flatCode,
      $or: [{ voteExpiry: null }, { voteExpiry: { $gt: new Date() } }]
    })
      .sort({ upvotes: -1 })
      .populate("user", "name email");

    if (!topComplaint) {
      return res.status(404).json({ message: "No complaints found" });
    }

    res.json(topComplaint);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/best-flatmate", authMiddleware, async (req, res) => {
  try {
    const bestFlatmate = await Complaint.aggregate([
      { $match: { flatCode: req.user.flatCode } },
      { $group: { _id: "$user", complaintsFiled: { $sum: 1 } } },
      { $sort: { complaintsFiled: -1 } },
      { $limit: 1 }
    ]);

    if (!bestFlatmate.length) {
      return res.status(404).json({ message: "No best flatmate found" });
    }

    const user = await User.findById(bestFlatmate[0]._id).select("name karmaPoints");
    res.json({ bestFlatmate: user, complaintsFiled: bestFlatmate[0].complaintsFiled });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/:id/resolve", async (req, res) => {
  try {
      const complaint = await Complaint.findById(req.params.id);
      if (!complaint) return res.status(404).json({ message: "Complaint not found" });

      complaint.resolved = true;
      complaint.upvotes = 0;
      complaint.downvotes = 0;
      await complaint.save();

      res.json({ message: "Complaint resolved", complaint });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
});

export default router;
