import { useEffect, useState } from "react";
import langData from "@/lang";
import { Calendar, MapPin, Clock, Loader2 } from "lucide-react";

interface Report {
  _id: string;
  issueType: string;
  status: string;
  createdAt: string;
}

interface MunicipalEvent {
  eventid: string;
  eventtype: string;
  startdatetime: string;
  enddatetime: string;
  eventagency: string;
  borough: string;
  category: string;
  subcategoryname: string;
  eventname?: string;
}

interface Reward {
  id: number;
  key: string;
  coins: number;
}

const MyReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [coins, setCoins] = useState(0);
  const [events, setEvents] = useState<MunicipalEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(false);

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

  useEffect(() => {
    const fetchEvents = async () => {
      setEventsLoading(true);
      setEventsError(false);
      try {
        const today = new Date().toISOString().split("T")[0];
        const url = `https://data.cityofnewyork.us/resource/tg4x-b46p.json?$where=startdatetime>='${today}'&$order=startdatetime ASC&$limit=6`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data: MunicipalEvent[] = await res.json();
        setEvents(data);
      } catch {
        setEventsError(true);
      } finally {
        setEventsLoading(false);
      }
    };
    fetchEvents();
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

  const formatEventDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatEventTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
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
            <h2 className="text-2xl font-semibold leading-tight">
              {t.upcomingEvents}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {t.eventsSubtitle}
            </p>
          </div>
        </div>

        {eventsLoading && (
          <div className="flex items-center justify-center py-12 bg-white rounded-xl shadow">
            <Loader2 className="w-6 h-6 text-green-600 animate-spin mr-2" />
            <span className="text-gray-500">{t.loadingEvents}</span>
          </div>
        )}

        {eventsError && !eventsLoading && (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
            <Calendar className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p>{t.eventsError}</p>
            <p className="text-sm mt-1">{t.tryAgainLater}</p>
          </div>
        )}

        {!eventsLoading && !eventsError && events.length === 0 && (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
            <Calendar className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p>{t.noEvents}</p>
          </div>
        )}

        {!eventsLoading && !eventsError && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event, idx) => (
              <div
                key={event.eventid || idx}
                className="bg-white shadow rounded-xl p-5 flex flex-col gap-3 border-l-4 border-green-500 hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="inline-block text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full mb-2">
                    {event.category || event.eventtype || "Community Event"}
                  </span>
                  <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">
                    {event.subcategoryname ||
                      event.eventtype ||
                      "Municipal Event"}
                  </h3>
                </div>

                <div className="space-y-1.5 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{formatEventDate(event.startdatetime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600 shrink-0" />
                    <span>
                      {formatEventTime(event.startdatetime)}
                      {event.enddatetime
                        ? ` – ${formatEventTime(event.enddatetime)}`
                        : ""}
                    </span>
                  </div>
                  {event.borough && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="capitalize">
                        {event.borough.toLowerCase()}
                      </span>
                    </div>
                  )}
                </div>

                {event.eventagency && (
                  <p className="text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100 truncate">
                    {event.eventagency}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
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
