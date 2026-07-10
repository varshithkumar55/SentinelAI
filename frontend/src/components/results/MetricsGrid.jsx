import { ShieldAlert, Brain, Target, BadgeCheck } from "lucide-react";

function MetricsGrid({ data }) {

  const missionScore = Math.round(
    (data.confidence * 0.7) +
    (data.risk_level === "Low"
      ? 30
      : data.risk_level === "Medium"
      ? 20
      : data.risk_level === "High"
      ? 10
      : 5)
  );

  const cards = [
    {
      title: "Risk Level",
      value: data.risk_level,
      icon: ShieldAlert,
    },
    {
      title: "AI Confidence",
      value: `${data.confidence}%`,
      icon: Brain,
    },
    {
      title: "Mission Score",
      value: `${missionScore}%`,
      icon: Target,
    },
    {
      title: "Strategy",
      value: "Ready",
      icon: BadgeCheck,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <p className="text-slate-500">
                {card.title}
              </p>

              <Icon size={22} />

            </div>

            <h2 className="mt-4 text-3xl font-bold">
              {card.value}
            </h2>

          </div>

        );

      })}

    </div>
  );
}

export default MetricsGrid;