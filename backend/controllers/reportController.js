import Report from "../models/Report.js";
import User from "../models/user.js";


/* ===============================
   CREATE REPORT
================================*/
export const createReport = async (req, res) => {

  try {

    // ✅ Read manually (fix for FormData)
    const userId = req.body.userId || null;
    const binId = req.body.binId;
    const issueType = req.body.issueType;
    const location = req.body.location;
    const phone = req.body.phone;
    const description = req.body.description;

    // 🔥 DEBUG (remove later)
    console.log("USER ID RECEIVED:", userId);

    const newReport = new Report({
      userId,
      binId,
      issueType,
      location,
      phone,
      description,
      image: req.file ? req.file.path : null
    });

    await newReport.save();

    res.status(201).json({
      message: "Report submitted successfully",
      report: newReport
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error submitting report"
    });

  }

};


/* ===============================
   GET ALL REPORTS (ADMIN)
================================*/
export const getReports = async (req, res) => {

  try {

    const reports = await Report.find()
      .populate("userId", "name email") // 🔥 MUST BE HERE
      .sort({ createdAt: -1 });

    res.json(reports);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching reports"
    });

  }

};


/* ===============================
   UPDATE REPORT STATUS
================================*/
export const updateReportStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found"
      });
    }

    const previousStatus = report.status;

    report.status = status;

    await report.save();

    // Award coins only once
    if (
      status === "Completed" &&
      previousStatus !== "Completed" &&
      report.userId
    ) {

      await User.findByIdAndUpdate(
        report.userId,
        { $inc: { coins: 10 } }
      );

    }

    res.json(report);

  } catch (error) {

    res.status(500).json({
      message: "Error updating status"
    });

  }

};


/* ===============================
   GET USER REPORTS
================================*/
export const getUserReports = async (req, res) => {

  try {

    const reports = await Report.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(reports);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching user reports"
    });

  }

};