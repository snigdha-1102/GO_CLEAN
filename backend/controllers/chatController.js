import { askGemini } from "../services/geminiService.js";
import appKnowledge from "../data/appKnowledge.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    const text = message.toLowerCase();

    // GO.CLEAN feature responses
    if (
      text.includes("report") ||
      text.includes("illegal dumping") ||
      text.includes("dumping")
    ) {
      return res.json({
        success: true,
        reply: appKnowledge.report,
      });
    }

    if (
      text.includes("qr") ||
      text.includes("scan") ||
      text.includes("camera")
    ) {
      return res.json({
        success: true,
        reply: appKnowledge.qr,
      });
    }

    if (
      text.includes("reward") ||
      text.includes("points")
    ) {
      return res.json({
        success: true,
        reply: appKnowledge.rewards,
      });
    }

    if (
      text.includes("login") ||
      text.includes("sign in") ||
      text.includes("google")
    ) {
      return res.json({
        success: true,
        reply: appKnowledge.login,
      });
    }

    if (
      text.includes("community") ||
      text.includes("story") ||
      text.includes("feed")
    ) {
      return res.json({
        success: true,
        reply: appKnowledge.stories,
      });
    }

    if (
      text.includes("admin") ||
      text.includes("dashboard")
    ) {
      return res.json({
        success: true,
        reply: appKnowledge.admin,
      });
    }

    // Anything else → Ask AI
    const reply = await askGemini(message);

    res.json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate response",
    });
  }
};