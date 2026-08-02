import express from "express";
import multer from "multer";
import { classifyImage } from "../controllers/classifyController.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

router.post("/classify", upload.single("image"), classifyImage);

export default router;