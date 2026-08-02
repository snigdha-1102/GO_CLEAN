import express from "express";
import multer from "multer";
import { classifyImage } from "../controllers/classifyController.js";

const router = express.Router();

// Store uploaded images temporarily
const upload = multer({
  dest: "uploads/",
});

router.post("/classify", upload.single("image"), classifyImage);

export default router;