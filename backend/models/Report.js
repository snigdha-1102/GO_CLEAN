import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  binId: {
    type: String
  },

  issueType: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  phone: {
    type: String
  },

  description: {
    type: String
  },

  image: {
    type: String
  },

  status: {
    type: String,
    enum: ["Reported", "Assigned", "In Progress", "Completed"],
    default: "Reported"
  }

}, { timestamps: true });

export default mongoose.model("Report", reportSchema);