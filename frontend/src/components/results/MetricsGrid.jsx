import {
  ShieldAlert,
  Brain,
  Target,
  CheckCircle2,
} from "lucide-react";

function MetricsGrid({ data }) {
  const confidence = Number(data.confidence) || 0;

  const riskAdjustment = {
  Low: 5,
  Medium: 0,
  High: -3,
  Critical: -5,
    };

    const missionScore = Math.max(
  0,
  Math.min(
    100,
    Math.round(
      confidence + (riskAdjustment[data.risk_level] || 0)
    )
    )
    );

  function getStatus() {
    if (confidence >= 90 && data.risk_level !== "Critical")
      return "MISSION READY";

    if (confidence >= 80)
      return "READY";

    if (confidence >= 65)
      return "CAUTION";

    return "REVIEW";
  }

  function statusColor() {
    switch (getStatus()) {
      case "MISSION READY":
        return "text-emerald-700";

      case "READY":
        return "text-blue-700";

      case "CAUTION":
        return "text-orange-600";

      default:
        return "text-red-600";
    }
  }

  const metrics = [
    {
      title: "Risk Level",
      value: data.risk_level,
      icon: ShieldAlert,
      bg: "bg-red-50",
      color: "text-red-600",
    },
    {
      title: "AI Confidence",
      value: `${confidence}%`,
      icon: Brain,
      bg: "bg-blue-50",
      color: "text-blue-700",
    },
    {
      title: "Mission Score",
      value: `${missionScore}%`,
      icon: Target,
      bg: "bg-green-50",
      color: "text-green-700",
    },
    {
      title: "Status",
      value: getStatus(),
      icon: CheckCircle2,
      bg: "bg-emerald-50",
      color: statusColor(),
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`${item.bg} rounded-3xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {item.title}
              </p>

              <Icon
                className={item.color}
                size={24}
              />
            </div>

            <h2
              className={`mt-6 text-4xl font-bold ${item.color}`}
            >
              {item.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default MetricsGrid;