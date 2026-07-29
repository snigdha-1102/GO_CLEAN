import Admin from "../models/Admin.js";

export const adminLogin = async (req, res) => {
  try {

    const { id, password } = req.body;

    // find admin by ID (not email)
    const admin = await Admin.findOne({ adminId: id });

    if (!admin || admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    res.json({
      success: true,
      message: "Login successful"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};