
import { classifyWaste } from "../services/classifyService.js";

export const classifyImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

   const result = await classifyWaste(
  req.file.buffer,
  req.file.mimetype
);

    res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to classify image",
    });

  } 
};