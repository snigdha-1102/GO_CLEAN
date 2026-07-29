import User from "../models/user.js";

export const redeemReward = async (req, res) => {

  try {

    const { userId, cost } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.coins < cost) {
      return res.status(400).json({
        message: "Not enough coins"
      });
    }

    user.coins -= cost;

    await user.save();

    res.json({
      message: "Reward redeemed successfully",
      coins: user.coins
    });

  } catch (error) {

    res.status(500).json({
      message: "Error redeeming reward"
    });

  }

};