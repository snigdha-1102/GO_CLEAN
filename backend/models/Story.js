import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text: String,
  image: String
}, { timestamps: true });

export default mongoose.model("Story", storySchema);