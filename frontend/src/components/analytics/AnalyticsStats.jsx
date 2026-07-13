import { getMissions } from "../../services/storage/missionStorage";

function AnalyticsStats() {

  const missions = getMissions();

  const total = missions.length;

  const averageConfidence =
    total === 0
      ? 0
      : Math.round(
          missions.reduce((sum, mission) => {

            let confidence = Number(mission.confidence) || 0;

            if (confidence <= 1) confidence *= 100;

            return sum + confidence;

          }, 0) / total
        );

  const highRisk =
    missions.filter(
      m =>
        m.risk_level === "High" ||
        m.risk_level === "Critical"
    ).length;

  const environments =
    new Set(
      missions.map(m => m.environment)
    ).size;

  const cards = [

    {
      title: "Total Missions",
      value: total,
      icon: "🛰️",
      color: "bg-blue-100 text-blue-700",
    },

    {
      title: "Avg AI Confidence",
      value: `${averageConfidence}%`,
      icon: "🤖",
      color: "bg-purple-100 text-purple-700",
    },

    {
      title: "High Risk Missions",
      value: highRisk,
      icon: "⚠️",
      color: "bg-red-100 text-red-700",
    },

    {
      title: "Mission Environments",
      value: environments,
      icon: "🌍",
      color: "bg-green-100 text-green-700",
    },

  ];

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map(card => (

        <div
          key={card.title}
          className="bg-surface border-app rounded-2xl border p-6 shadow-sm"
        >

          <div
            className={`inline-flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${card.color}`}
          >

            {card.icon}

          </div>

          <h3 className="mt-6 text-4xl font-bold">

            {card.value}

          </h3>

          <p className="mt-2 text-secondary">

            {card.title}

          </p>

        </div>

      ))}

    </div>

  );

}

export default AnalyticsStats;