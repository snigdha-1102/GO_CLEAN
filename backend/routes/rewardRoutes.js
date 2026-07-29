import express from "express";
import { redeemReward } from "../controllers/rewardController.js";

const router = express.Router();

router.post("/redeem", redeemReward);

export default router;