import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getMissions } from "../../services/storage/missionStorage";

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

function History() {

  const navigate = useNavigate();

  const missions = getMissions();

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div className="space-y-6">

          {missions.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

              <h3 className="text-xl font-semibold">

                No mission history yet

              </h3>

              <p className="mt-2 text-slate-500">

                Analyze your first scenario to build your mission timeline.

              </p>

            </div>

          ) : (

            missions.map((mission) => (

              <div
                key={mission.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md cursor-pointer"
                onClick={() =>
                  navigate("/results", {
                    state: mission,
                  })
                }
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="text-xl font-bold">

                      {mission.scenario}

                    </h2>

                    <p className="mt-1 text-slate-500">

                      {mission.mission}

                    </p>

                    <p className="mt-3 text-sm text-slate-400">

                      {mission.submittedAt}

                    </p>

                  </div>

                  <div className="text-right">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${badgeColor(
                        mission.risk_level
                      )}`}
                    >

                      {mission.risk_level}

                    </span>

                    <p className="mt-3 text-lg font-semibold">

                      {mission.confidence <= 1
                        ? Math.round(mission.confidence * 100)
                        : mission.confidence}
                      %

                    </p>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </DashboardLayout>

  );

}

export default History;