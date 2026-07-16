import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getMissions,
  getMission,
  deleteMission,
} from "../../services/missionService";

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

  const [missions, setMissions] = useState([]);
  async function openMission(id) {
    try {
      const mission = await getMission(id);

      navigate("/results", {
        state: {
          ...mission,
          ...(mission.analysis_json || {}),
          summary:
            mission.analysis_json?.summary ||
            mission.ai_response,
        },
      });

    } catch (err) {
      console.error(err);
    }
  }

  async function loadMissions() {

    try {

      const data = await getMissions();

      setMissions(data);

    }

    catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {

    loadMissions();

  }, []);

  async function handleDelete(id) {

    const ok = window.confirm(
      "Delete this mission permanently?"
    );

    if (!ok) return;

    try {

      await deleteMission(id);

      await loadMissions();

      alert("Mission deleted successfully.");

    }

    catch (err) {

      console.error(err);

      alert("Failed to delete mission.");

    }

  }

  return (

    <DashboardLayout>

      <div className="space-y-8">

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
              className="cursor-pointer rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm transition hover:shadow-md"
              onClick={() => openMission(mission.id)}
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

                    {new Date(
                      mission.created_at
                    ).toLocaleString()}

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
                      ? Math.round(
                          mission.confidence * 100
                        )
                      : mission.confidence}

                    %

                  </p>

                  <button
                    className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    onClick={(e) => {

                      e.stopPropagation();

                      handleDelete(mission.id);

                    }}
                  >

                    🗑 Delete

                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </DashboardLayout>

  );

}

export default History;