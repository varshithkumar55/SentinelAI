import useMissions from "../../hooks/useMissions";

function MissionHealthCard() {

  const { missions, loading } = useMissions();

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Mission Health
        </h2>
        <p>Loading...</p>
      </div>
    );
  }

  let score = 0;

  if (missions.length > 0) {

    const avgConfidence =
      missions.reduce((sum, mission) => {

        let confidence = Number(mission.confidence) || 0;

        if (confidence <= 1) confidence *= 100;

        return sum + confidence;

      }, 0) / missions.length;

    score = Math.round(avgConfidence);

  }

  let status = "Needs Attention";

  if (score >= 90)
    status = "Excellent";

  else if (score >= 75)
    status = "Good";

  else if (score >= 60)
    status = "Moderate";

  return (

    <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

      <h2 className="text-xl font-bold">

        Mission Health

      </h2>

      <div className="mt-6">

        <h1 className="text-5xl font-bold text-blue-900">

          {score}%

        </h1>

        <div className="mt-5 h-3 rounded-full bg-slate-200">

          <div

            className="h-3 rounded-full bg-blue-900 transition-all"

            style={{

              width: `${score}%`

            }}

          />

        </div>

        <p className="mt-4 text-slate-600">

          {status}

        </p>

      </div>

    </div>

  );

}

export default MissionHealthCard;