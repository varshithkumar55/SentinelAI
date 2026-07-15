import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAllMissions } from "../../services/missionService";
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
  useEffect(() => {

    async function loadMissions() {

      try {

        const data = await getAllMissions();

        setMissions(data);

      }

      catch (error) {

        console.error(error);

      }

    }

    loadMissions();

  }, []);
  const [missions, setMissions] = useState([]);

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div className="space-y-6">

          {missions.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-surface p-12 text-center">

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
                className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm transition hover:shadow-md cursor-pointer"
                onClick={() =>
                  navigate("/results", {
                    state: {
                    ...mission,
                    summary: mission.ai_response,
                },
              })
                }
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="text-xl font-bold">

                      {mission.title}

                    </h2>

                    <p className="mt-1 text-slate-500">

                      {mission.mission_type}

                    </p>

                    <p className="mt-3 text-sm text-slate-400">

                      {new Date(mission.created_at).toLocaleString()}

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