import { useEffect, useState } from "react";
import langData from "@/lang";
import { Calendar } from "lucide-react";

interface Report {
  _id: string;
  issueType: string;
  status: string;
  createdAt: string;
}



interface Reward {
  id: number;
  key: string;
  coins: number;
}

const MyReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [coins, setCoins] = useState(0);
  

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const lang = localStorage.getItem("lang") || "en";
  const t = langData[lang];

  const getIssueKey = (issue: string) => {
    if (!issue) return issue;
    const map: Record<string, string> = {
      "Illegal Dumping": "illegal",
      "Overflowing Bin": "overflow",
      "Damaged Bin": "damaged",
    };
    return map[issue] || issue;
  };

  const getStatusKey = (status: string) => {
    if (!status) return status;
    const map: Record<string, string> = {
      Completed: "completed",
      "In Progress": "inProgress",
      Pending: "pending",
    };
    return map[status] || status;
  };

  const rewards: Reward[] = [
    { id: 1, key: "treeCert", coins: 20 },
    { id: 2, key: "cleanBadge", coins: 40 },
    { id: 3, key: "smartAward", coins: 100 },
  ];
 const events: {
  title: string;
  organizer: string;
  link: string;
}[] = [
  {
    title: " Tree Plantation Drives",
    organizer: "MY Bharat",
    link: "https://mybharat.gov.in/",
  },
  {
    title: "Swachh Bharat Mission",
    organizer: "Government of India",
    link: "https://swachhbharatmission.gov.in/",
  },
  {
    title: " Beach Cleanup Activities",
    organizer: "GVMC",
    link: "https://www.gvmc.gov.in/",
  },
];

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const reportsRes = await fetch(
          `https://go-clean-backend-47t6.onrender.com/api/user/${user._id}/reports`
        );
        const reportsData = await reportsRes.json();
        setReports(reportsData);

        const coinsRes = await fetch(
          `https://go-clean-backend-47t6.onrender.com/api/user/${user._id}/coins`
        );
        const coinsData = await coinsRes.json();
        setCoins(coinsData.coins);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  
  
  const redeemReward = async (reward: Reward) => {
    if (coins < reward.coins) {
      alert(t.notEnoughCoins);
      return;
    }
    try {
      const res = await fetch(
        "https://go-clean-backend-47t6.onrender.com/api/rewards/redeem",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id, cost: reward.coins }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setCoins(data.coins);
        alert(`${t.redeemed}: ${t[reward.key] || reward.key}`);

        const cert = await fetch(
          "https://go-clean-backend-47t6.onrender.com/api/certificate/generate",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user._id, reward: reward.key }),
          }
        );
        if (!cert.ok) {
          alert("Certificate generation failed");
          return;
        }
        const blob = await cert.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "certificate.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

 

  

  if (!user) {
    return <div className="pt-24 text-center">{t.loginFirst}</div>;
  }

  const completed = reports.filter((r) => r.status === "Completed").length;

  return (
    <div className="pt-24 px-6 pb-20">
      <h1 className="text-3xl font-bold mb-6">{t.myDashboard}</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {t.welcome} {user.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-sm">{t.coins}</p>
            <p className="text-2xl font-bold text-green-700">{coins}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-sm">{t.submitted}</p>
            <p className="text-2xl font-bold text-blue-700">{reports.length}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-sm">{t.completed}</p>
            <p className="text-2xl font-bold text-yellow-700">{completed}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">{t.myReports}</h2>
      <div className="space-y-4 mb-10">
        {reports.map((report) => (
          <div
            key={report._id}
            className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {t[getIssueKey(report.issueType)] || report.issueType}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(report.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded text-white text-sm ${
                report.status === "Completed"
                  ? "bg-green-600"
                  : report.status === "In Progress"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            >
              {t[getStatusKey(report.status)] || report.status}
            </span>
          </div>
        ))}
      </div>

      {/* Municipal Events Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-green-600 p-2 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-700 leading-tight">
  Environmental Initiatives & Events
</h2>
           <p className="text-sm text-gray-500 mt-1">
  Explore official government campaigns, municipal initiatives and environmental volunteer opportunities.
</p>
          </div>
        </div>

<div className="space-y-4">
  {events.map((event, index) => (
    <div
      key={index}
      className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition"
    >
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">
  {event.title}
</h3>

<p className="text-green-700 font-medium">
  🏛️ {event.organizer}
</p>

<p className="text-sm text-gray-500 mt-2">
  Learn more about this official environmental initiative and participate through the government portal.
</p>
      </div>

      <a
        href={event.link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        🔗 Visit Official Website
      </a>
    </div>
  ))}

  <div className="text-center pt-6">
    <button
  onClick={() => (window.location.href = "/events")}
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition font-medium"
>
  View All Environmental Initiatives →
</button>
  </div>
</div>
    </div>      

      <h2 className="text-2xl font-semibold mb-4">{t.rewards}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white shadow rounded-xl p-6 text-center"
          >
            <h3 className="text-lg font-semibold mb-2">
              {t[reward.key] || reward.key}
            </h3>
            <p className="text-gray-500 mb-4">
              {reward.coins} {t.coins}
            </p>
            <button
              onClick={() => redeemReward(reward)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {t.redeem}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReports;
