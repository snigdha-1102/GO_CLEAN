import path from "path";
import fs from "fs";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import User from "../models/user.js";

export const generateCertificate = async (req, res) => {
  try {
    const { userId, reward } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ ENGLISH ONLY
    const t = {
      title: "Government of India - Clean Initiative",
      sub: "Certificate of Appreciation",
      line1: "This certificate is proudly awarded to",
      line2: "For contributing to environmental cleanliness through",
      issued: "GO.CLEAN - Municipal Initiative",
      date: "Date",
      certId: "Certificate ID"
    };

    // 🔥 UNIQUE CERTIFICATE ID
    const certId = "GC-" + Date.now();

    // 🔥 QR DATA
    const qrData = `Certificate ID: ${certId} | Name: ${user.name}`;
    const qrImage = await QRCode.toDataURL(qrData);

    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 40
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=certificate.pdf");

    doc.pipe(res);

    // ✅ FONT
    const fontPath = path.join(process.cwd(), "backend", "fonts", "NotoSans-Regular.ttf");
    if (fs.existsSync(fontPath)) {
      doc.font(fontPath);
    }

    // 🎨 BORDER
    doc.rect(20, 20, 800, 550).lineWidth(4).stroke("#065f46");
    doc.rect(30, 30, 780, 530).lineWidth(1).stroke("#065f46");

    // 🟢 LOGO
    try {
      const logoPath = path.join(process.cwd(), "backend", "uploads", "logo.png");
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 370, 40, { width: 70 });
      }
    } catch {}

    // 🏛 HEADER
    doc
      .fontSize(18)
      .fillColor("#065f46")
      .text(t.title, { align: "center" });

    doc
      .moveDown(0.5)
      .fontSize(28)
      .fillColor("#16a34a")
      .text(t.sub, { align: "center" });

    // 📜 LINE 1
    doc
      .moveDown(1)
      .fontSize(16)
      .fillColor("black")
      .text(t.line1, { align: "center" });

    // 👤 NAME
    doc
      .moveDown(0.5)
      .fontSize(30)
      .fillColor("#16a34a")
      .text(user.name, { align: "center", underline: true });

    // 📜 LINE 2
    doc
      .moveDown(0.5)
      .fontSize(16)
      .fillColor("black")
      .text(t.line2, { align: "center" });

    // 🎁 REWARD (✅ FIXED ONLY THIS PART)
    const rewardMap = {
      treeCert: "Tree Plantation Certificate",
      cleanBadge: "Clean Citizen Badge",
      smartAward: "Smart Waste Award"
    };

    const safeReward =
      rewardMap[reward] || "Environmental Cleanliness Contribution";

    doc
      .moveDown(0.5)
      .fontSize(18)
      .fillColor("#16a34a")
      .text(safeReward, { align: "center" });

    // 🆔 CERTIFICATE ID
    doc
      .moveDown(1)
      .fontSize(12)
      .fillColor("black")
      .text(`${t.certId}: ${certId}`, { align: "center" });

    // 🔳 QR CODE
    doc.image(qrImage, 650, 400, { width: 100 });

    // ✍️ SIGNATURES
    doc.moveTo(200, 430).lineTo(350, 430).stroke();
    doc.moveTo(500, 430).lineTo(650, 430).stroke();

    doc.fontSize(12);
    doc.text("GO.CLEAN", 240, 435);
    doc.text("GO.CLEAN", 540, 435);

    doc.fontSize(10);
    doc.text("Authority Signature", 200, 450);
    doc.text("Project Head", 520, 450);

    // 📅 DATE
    doc
      .fontSize(12)
      .text(`${t.date}: ${new Date().toLocaleDateString()}`, 0, 500, {
        align: "center"
      });

    // 🏢 FOOTER
    doc
      .fontSize(10)
      .fillColor("gray")
      .text(t.issued, 0, 520, { align: "center" });

    doc.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Certificate generation failed"
    });
  }
};