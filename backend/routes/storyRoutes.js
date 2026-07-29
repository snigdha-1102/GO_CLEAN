import express from "express";
import upload from "../middleware/upload.js"; // ✅ NEW (cloudinary)
import { createStory, getStories } from "../controllers/storyController.js";

const router = express.Router();

// ✅ Upload goes to Cloudinary now
router.post("/", upload.single("image"), createStory);

router.get("/", getStories);

export default router;