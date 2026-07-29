import { useEffect, useState } from "react";
import langData from "@/lang";

const handleEmailShare = (report) => {

  const subject = "Waste Issue Report - GO.CLEAN";

  const imageUrl = report.image
    ? `https://go-clean-backend-47t6.onrender.com/uploads/${report.image}`
    : "No Image";

  const body = `
🚨 Waste Issue Report

👤 User: ${report.userId?.name || "Unknown"}
📧 Email: ${report.userId?.email || "-"}
📍 Location: ${report.location}
🗑 Issue: ${report.issueType}
📞 Phone: ${report.phone || "-"}
📝 Description: ${report.description || "-"}

📷 Image: ${imageUrl}

📅 Date: ${new Date(report.createdAt).toLocaleDateString()}

Please take necessary action.

- GO.CLEAN Admin Dashboard
  `;

  window.location.href =
    `mailto:municipal@city.gov` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
};
const AdminDashboard = () => {

  const [reports, setReports] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const lang = localStorage.getItem("lang") || "en";
  const t = langData[lang];

  const API = "https://go-clean-backend-47t6.onrender.com/api/report";

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API}/reports`);
      const data = await res.json();
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API}/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      fetchReports();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");

    if (!isAdmin) {
      window.location.href = "/admin-login";
    } else {
      fetchReports();
    }
  }, []);

  return (

    <div className="px-4 md:px-10 pt-24 pb-20">

      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        {t.dashboard}
      </h1>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} className="max-w-full max-h-[90vh] rounded" />
        </div>
      )}

      {/* MOBILE VIEW */}
<div className="md:hidden space-y-5">

  {reports.map((report) => (

    <div key={report._id} className="bg-white rounded-xl shadow-md p-4 space-y-3">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm text-green-700">
          {report.issueType}
        </h3>
        <span className="text-xs text-gray-500">
          {new Date(report.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* USER DETAILS */}
      <div className="text-sm space-y-1">
        <p><b>Name:</b> {report.userId?.name || "Unknown"}</p>
        <p className="break-all"><b>Email:</b> {report.userId?.email || "-"}</p>
        <p><b>Bin:</b> {report.binId || "Manual"}</p>
        <p><b>Phone:</b> {report.phone || "-"}</p>
        <p><b>Issue:</b> {report.description || "-"}</p>
      </div>

      {/* IMAGE */}
      {report.image && (
        <img
          src={
            report.image.startsWith("http")
              ? report.image
              : `https://go-clean-backend-47t6.onrender.com/uploads/${report.image}`
          }
          className="w-full max-h-52 object-cover rounded"
        />
      )}

      {/* LOCATION */}
      {report.location && (
        <button
          onClick={() => window.open(report.location, "_blank")}
          className="bg-blue-500 hover:bg-blue-600 text-black px-3 py-1 rounded text-sm w-full"
        >
          📍view location {t.viewMap}
        </button>
      )}

      {/* STATUS */}
      <div className="text-sm font-medium">
        Status: 
        <span className="ml-2 text-green-600">
          {report.status || "Pending"}
        </span>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-2">

        <button
          onClick={() => updateStatus(report._id, "Pending")}
          className="bg-gray-500 text-white px-3 py-1 rounded text-xs flex-1"
        >
          Pending
        </button>

        <button
          onClick={() => updateStatus(report._id, "In Progress")}
          className="bg-yellow-500 text-black px-3 py-1 rounded text-xs flex-1"
        >
          Progress
        </button>

        <button
          onClick={() => updateStatus(report._id, "Completed")}
          className="bg-green-600 text-white px-3 py-1 rounded text-xs flex-1"
        >
          Done
        </button>

      </div>

      {/* EMAIL BUTTON (FIXED POSITION) */}
      <button
        onClick={() => handleEmailShare(report)}
        className="bg-blue-600 hover:bg-blue-700 text-black px-3 py-2 rounded text-sm w-full"
      >
        📧 Send to Municipal
      </button>

    </div>

  ))}

</div>


      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">

        <table className="w-full border text-sm">

          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-3">{t.user}</th>
              <th className="p-3">{t.email}</th>
              <th className="p-3">Bin</th>
              <th className="p-3">Issue</th>
              <th className="p-3">Phone</th>
              <th className="p-3">{t.description}</th>
              <th className="p-3">Image</th>
              <th className="p-3">Location</th>
              <th className="p-3">{t.status}</th>
              <th className="p-3">Action</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>

            {reports.map((report) => (

              <tr key={report._id} className="border hover:bg-gray-50">

                <td className="p-3">{report.userId?.name || "Unknown"}</td>
                <td className="p-3">{report.userId?.email || "-"}</td>
                <td className="p-3">{report.binId || "Manual"}</td>
                <td className="p-3">{report.issueType}</td>
                <td className="p-3">{report.phone || "-"}</td>
                <td className="p-3 max-w-xs truncate">{report.description || "-"}</td>

                <td className="p-3">
                  {report.image ? (
                    <img
                      src={report.image}
                      onClick={() => setSelectedImage(report.image)}
                      className="w-16 h-16 object-cover rounded cursor-pointer"
                    />
                  ) : "-"}
                </td>

                {/* ✅ FIXED LOCATION */}
                <td className="p-3">
                  {report.location ? (
                    <button
  onClick={() => window.open(report.location, "_blank")}
  className="text-blue-600 underline hover:text-blue-800 text-sm font-medium flex items-center gap-1"
>
  📍 {t.viewMap || "View Map"}
</button>
                  ) : "-"}
                </td>

                <td className="p-3 font-semibold">
                  <span className={`px-2 py-1 rounded text-black text-xs ${
                    report.status === "Completed"
                      ? "bg-green-600"
                      : report.status === "In Progress"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}>
                    {report.status || "Pending"}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <button onClick={() => updateStatus(report._id, "Pending")} className="bg-gray-500 text-black px-2 py-1 rounded text-xs">Pending</button>
                  <button onClick={() => updateStatus(report._id, "In Progress")} className="bg-yellow-500 text-black px-2 py-1 rounded text-xs">Progress</button>
                  <button onClick={() => updateStatus(report._id, "Completed")} className="bg-green-600 text-black px-2 py-1 rounded text-xs">Done</button>
                  <button
  onClick={() => handleEmailShare(report)}
  className="bg-blue-500 hover:bg-blue-600 text-black px-2 py-1 rounded text-xs"
>
  📧 Email
</button>
                </td>

                <td className="p-3">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AdminDashboard;