import useMissions from "../../hooks/useMissions";
import EmptyState from "../../components/common/EmptyState";
function IntelligenceSummary() {

  const { missions, loading } = useMissions();
  if (loading) {
    return <p>Loading...</p>;
  }

  if (missions.length === 0) {
    return (
      <div className="bg-surface border-app rounded-2xl border p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">
          🧠 Executive Intelligence Brief
        </h2>

        <EmptyState
          icon="📊"
          title="No Analytics"
          description="Mission intelligence will appear after your first analysis."
        />
      </div>
    );
  }

  const total = missions.length;

  const avgConfidence = Math.round(
    missions.reduce((sum, mission) => {

      let c = Number(mission.confidence) || 0;

      if (c <= 1) c *= 100;

      return sum + c;

    }, 0) / total
  );

  const highRisk = missions.filter(
    m =>
      m.risk_level === "High" ||
      m.risk_level === "Critical"
  ).length;

  const environments = {};

  missions.forEach((m) => {

    if (!m.environment || m.environment === "Unknown") return;

    environments[m.environment] =
      (environments[m.environment] || 0) + 1;

  });

  const topEnvironment =
  Object.entries(environments)
  .sort((a,b)=>b[1]-a[1])[0]?.[0] || "N/A";
  
  const missionTypes = {};

  missions.forEach((m) => {

  const type =
    m.mission_type ||
    m.title ||
    "Unknown";

  missionTypes[type] =
    (missionTypes[type] || 0) + 1;

  });

  const topMission =
  Object.entries(missionTypes).length
    ? Object.entries(missionTypes)
        .sort((a,b)=>b[1]-a[1])[0][0]
    : "Unknown";
  const insights = [

    `Total missions analyzed: ${total}`,

    `Average AI confidence remains high at ${avgConfidence}%`,

    `${Math.round(highRisk/total*100)}% of recent missions are classified as High Risk.`,

    `${topEnvironment} is currently the most analyzed operational environment.`,

    `${topMission} is the most frequent mission category.`,

  ];

  return (

    <div className="bg-surface border-app rounded-2xl border p-8 shadow-sm">

      <h2 className="mb-8 text-2xl font-bold">

        🧠 Executive Intelligence Brief

      </h2>

      <div className="space-y-5">

        {insights.map((item,index)=>(

          <div
            key={index}
            className="flex items-start gap-4 rounded-xl border border-app p-4"
          >

            <div className="text-green-600 text-xl">

              ✓

            </div>

            <p className="leading-7">

              {item}

            </p>

          </div>

        ))}

      </div>

      <div className="mt-8 rounded-2xl bg-blue-50 p-6">

        <h3 className="font-bold text-blue-900">

          Strategic Recommendation

        </h3>

        <p className="mt-3 leading-7 text-blue-800">

          Continue prioritizing AI-assisted planning for
          high-risk operations while increasing surveillance
          coverage and resource redundancy in frequently
          analyzed environments.

        </p>

      </div>

    </div>

  );

}

export default IntelligenceSummary;