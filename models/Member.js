import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  paymentStatus: { type: String, enum: ["Paid", "Will Pay Soon"], required: true },
}, { timestamps: true });

export default mongoose.models.Member || mongoose.model("Member", MemberSchema);
