import { getMissions } from "../../services/storage/missionStorage";

function DashboardStats() {

  const missions = getMissions();

  const total = missions.length;

  const avgConfidence =
  total === 0
    ? 0
    : Math.round(
        missions.reduce((sum, mission) => {

          let confidence = Number(mission.confidence) || 0;

          // Convert decimal confidence (0.9) → 90
          if (confidence <= 1) {
            confidence *= 100;
          }

          return sum + confidence;

        }, 0) / total
      );

  const critical =
    missions.filter(
      (m) => m.risk_level === "Critical"
    ).length;

  const stats = [
    {
      title: "Active Missions",
      value: total,
      color: "bg-blue-100",
      text: "text-blue-700",
      icon: "🛰️",
    },
    {
      title: "Completed Reports",
      value: total,
      color: "bg-green-100",
      text: "text-green-700",
      icon: "📄",
    },
    {
      title: "AI Confidence",
      value: `${avgConfidence}%`,
      color: "bg-purple-100",
      text: "text-purple-700",
      icon: "🤖",
    },
    {
      title: "Critical Alerts",
      value: critical,
      color: "bg-red-100",
      text: "text-red-700",
      icon: "⚠️",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
        >
          <div
            className={`inline-flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${item.color}`}
          >
            {item.icon}
          </div>

          <h3 className="mt-6 text-4xl font-bold text-slate-900">
            {item.value}
          </h3>

          <p className={`mt-2 font-medium ${item.text}`}>
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;