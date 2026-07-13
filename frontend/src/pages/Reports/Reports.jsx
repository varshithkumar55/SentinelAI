import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, FileDown } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMissions } from "../../services/storage/missionStorage";
import { exportMissionPDF } from "../../utils/pdfGenerator";
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

function Reports() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");

  const missions = getMissions();

  const filteredMissions = missions.filter((mission) => {
    const query = search.toLowerCase();

    const matchesSearch =
      mission.scenario.toLowerCase().includes(query) ||
      mission.mission.toLowerCase().includes(query) ||
      mission.risk_level.toLowerCase().includes(query);

    const matchesRisk =
      riskFilter === "All" ||
      mission.risk_level === riskFilter;

    return matchesSearch && matchesRisk;
  });
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-sm">

          {/* Toolbar */}

          <div className="flex flex-col gap-4 border-b p-6 md:flex-row">

            <input
              type="text"
              placeholder="🔍 Search missions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 p-3 focus:border-blue-900 focus:outline-none"
            />

            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="rounded-xl border border-slate-300 p-3"
            >
              <option>All</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

          </div>

          {/* Table */}

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>
                <th className="p-5 text-left">Mission</th>
                <th className="p-5 text-left">Risk</th>
                <th className="p-5 text-left">Confidence</th>
                <th className="p-5 text-left">Date</th>
                <th className="p-5 text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredMissions.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="p-10 text-center text-slate-500"
                  >
                    No matching reports found.
                  </td>

                </tr>

              ) : (

                filteredMissions.map((mission) => (

                  <tr
                    key={mission.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-5">

                      <h3 className="font-semibold">
                        {mission.scenario}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {mission.mission}
                      </p>

                    </td>

                    <td className="p-5">

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${badgeColor(
                          mission.risk_level
                        )}`}
                      >
                        {mission.risk_level}
                      </span>

                    </td>

                    <td className="p-5">

                      {(() => {
                        let confidence =
                          Number(mission.confidence) || 0;

                        if (confidence <= 1)
                          confidence *= 100;

                        return `${Math.round(confidence)}%`;
                      })()}

                    </td>

                    <td className="p-5">
                      {formatDateTime(mission.createdAt)}
                    </td>

                    <td className="p-5">

                      <div className="flex justify-center gap-2">

                        <button
                          title="View Report"
                          onClick={() =>
                            navigate("/results", {
                              state: mission,
                            })
                          }
                          className="rounded-lg bg-blue-900 p-2 text-white transition hover:bg-blue-800"
                          >
                          <Eye
                          size={24}
                          color="white"
                          strokeWidth={3}
                        />
                        </button>

                        <button
                          title="Download PDF"
                          onClick={() => exportMissionPDF(mission)}
                          className="rounded-lg bg-green-700 p-2 text-white transition hover:bg-green-600"
                        >
                          <FileDown
                          size={24}
                          color="white"
                          strokeWidth={3}
                        />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Reports;