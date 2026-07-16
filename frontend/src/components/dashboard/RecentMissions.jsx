import useMissions from "../../hooks/useMissions";
import { formatDateTime } from "../../utils/dateFormatter";

function badgeColor(level) {
  switch (level) {
    case "Critical":
      return "bg-red-100 text-red-700";

    case "High":
      return "bg-orange-100 text-orange-700";

    case "Medium":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-green-100 text-green-700";
  }
}

function RecentMissions() {

  const { missions, loading } = useMissions();

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold">
          Recent Missions
        </h2>

        <p className="text-slate-500">
          Loading missions...
        </p>
      </div>
    );
  }

  return (

    <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-bold">
        Recent Missions
      </h2>

      <div className="space-y-4">

        {missions.length === 0 ? (

          <p className="text-slate-500">
            No missions available.
          </p>

        ) : (

          missions.map((mission) => (

            <div
              key={mission.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
            >

              <div>

                <h3 className="font-semibold">
                  {mission.scenario}
                </h3>

                <p className="text-sm text-slate-500">

                  AI Confidence{" "}

                  {(() => {

                    let confidence =
                      Number(mission.confidence) || 0;

                    if (confidence <= 1)
                      confidence *= 100;

                    return Math.round(confidence);

                  })()}
                  %

                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {formatDateTime(mission.createdAt)}
                </p>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${badgeColor(
                  mission.risk_level
                )}`}
              >
                {mission.risk_level}
              </span>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default RecentMissions;