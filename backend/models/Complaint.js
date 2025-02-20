import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  complaintType: { type: String, required: true },
  severity: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  flatCode: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  archived: { type: Boolean, default: false },
  voteExpiry: { type: Date }, 
}, { timestamps: true });

export default mongoose.model("Complaint", ComplaintSchema);
