import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: false // ✅ FIXED
  },

  coins: {
    type: Number,
    default: 0
  },

  role: {
    type: String,
    enum: ["citizen", "admin", "worker"],
    default: "citizen"
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);