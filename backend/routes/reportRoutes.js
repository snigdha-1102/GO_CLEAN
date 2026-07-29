import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

import {
  createReport,
  getReports,
  updateReportStatus,
  getUserReports
} from "../controllers/reportController.js";

const router = express.Router();


// ✅ CLOUDINARY STORAGE (REPLACES LOCAL STORAGE)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "waste-reports",
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});

const upload = multer({ storage });


// CREATE REPORT
router.post("/", upload.single("image"), createReport);


// GET ALL REPORTS (ADMIN)
router.get("/reports", getReports);


// UPDATE REPORT STATUS (ADMIN / WORKER)
router.patch("/:id/status", updateReportStatus);


// GET REPORTS OF A SPECIFIC USER (CITIZEN TRACKING)
router.get("/user/:userId", getUserReports);


export default router;