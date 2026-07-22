import useMissions from "../../hooks/useMissions";
import Skeleton from "../common/Skeleton";
function DashboardStats() {

  const { missions, loading } = useMissions();

  if (loading) {
    return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm"
        >
          <Skeleton className="h-14 w-14" />
          <Skeleton className="mt-6 h-10 w-24" />
          <Skeleton className="mt-3 h-4 w-36" />
        </div>
      ))}
    </div>
  );
  }

  const total = missions.length;

  const avgConfidence =
    total === 0
      ? 0
      : Math.round(
          missions.reduce((sum, mission) => {

            let confidence = Number(mission.confidence) || 0;

            if (confidence <= 1)
              confidence *= 100;

            return sum + confidence;

          }, 0) / total
        );

  const highRisk = missions.filter(
    (m) =>
      m.risk_level === "High" ||
      m.risk_level === "Critical"
  ).length;

  const stats = [
    {
      title: "Missions Analysed",
      value: total,
      color: "bg-blue-100",
      text: "text-blue-700",
      icon: "🛰️",
    },
    {
      title: "Reports Generated",
      value: total,
      color: "bg-green-100",
      text: "text-green-700",
      icon: "📄",
    },
    {
      title: "Average AI Confidence",
      value: `${avgConfidence}%`,
      color: "bg-purple-100",
      text: "text-purple-700",
      icon: "🎯",
    },
    {
      title: "High-Risk Missions",
      value: highRisk,
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
          className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm transition hover:shadow-lg"
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