import express from "express";
import { getUserCoins, getUserReports } from "../controllers/userController.js";

const router = express.Router();

/* Get user reports */
router.get("/:id/reports", getUserReports);

/* Get user coins */
router.get("/:id/coins", getUserCoins);

export default router;