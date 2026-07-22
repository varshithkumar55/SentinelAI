import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, FileDown } from "lucide-react";
import Skeleton from "../../components/common/Skeleton";
import DashboardLayout from "../../layouts/DashboardLayout";
import useMissions from "../../hooks/useMissions";
import { exportMissionPDF } from "../../utils/pdfGenerator";
import { formatDateTime } from "../../utils/dateFormatter";
import EmptyState from "../../components/common/EmptyState";
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

  const { missions, loading } = useMissions();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center text-lg">
          <Skeleton className="h-96 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  const filteredMissions = missions.filter((mission) => {
    const query = search.toLowerCase();

    const matchesSearch =
      mission.title.toLowerCase().includes(query) ||
      mission.mission_type.toLowerCase().includes(query) ||
      mission.risk_level.toLowerCase().includes(query);

    const matchesRisk =
      riskFilter === "All" ||
      mission.risk_level === riskFilter;

    return matchesSearch && matchesRisk;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            Mission Reports
          </h1>

          <p className="mt-2 text-slate-600">
            Search, review and export AI-generated mission intelligence reports.
          </p>
        </div>

        {/* Table Card */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-sm">

          {/* Toolbar */}

          <div className="flex flex-col gap-4 border-b p-6 md:flex-row">

            <input
              type="text"
              placeholder="🔍 Search by mission, type or risk..."
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

          {/* Report Count */}

          <div className="flex items-center justify-between border-b bg-slate-50 px-6 py-3">

            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold">
                {filteredMissions.length}
              </span>{" "}
              report{filteredMissions.length !== 1 && "s"}
            </p>

          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="min-w-full">
            <thead className="bg-slate-50">

              <tr>

                <th className="p-5 text-left">
                  Mission Title
                </th>

                <th className="p-5 text-left">
                  Risk
                </th>

                <th className="p-5 text-left">
                  Confidence
                </th>

                <th className="p-5 text-left">
                  Date
                </th>

                <th className="p-5 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>
              {loading ? (

                <div className="space-y-5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                        className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm"
                    >
                      <Skeleton className="h-8 w-64" />
                      <Skeleton className="mt-4 h-5 w-32" />
                      <Skeleton className="mt-5 h-4 w-48" />
                    </div>
                  ))}
                </div>

              ) : filteredMissions.length === 0 ? (

                <tr>
                  <td colSpan="5" className="p-8">

                    <EmptyState
                      icon="📄"
                      title="No Mission Reports"
                      description="Analyze your first scenario to generate AI reports."
                    />

                  </td>
                </tr>

              ) : (

                filteredMissions.map((mission) => (

                  <tr
                    key={mission.id}
                    className="border-t transition hover:bg-slate-50"
                  >

                    <td className="p-5">

                      <h3 className="font-semibold text-slate-900">
                        {mission.title}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {mission.mission_type}
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

                    <td className="p-5 font-semibold">

                      {Math.round(
                        Number(mission.confidence) <= 1
                          ? Number(mission.confidence) * 100
                          : Number(mission.confidence)
                      )}
                      %

                    </td>

                    <td className="p-5 text-slate-600">
                      {formatDateTime(mission.created_at)}
                    </td>

                    <td className="p-5">

                      <div className="flex justify-center gap-3">

                        <button
                          title="View Report"
                          onClick={() =>
                            navigate("/results", {
                              state: mission.analysis_json
                                ? {
                                    ...mission.analysis_json,
                                    title: mission.title,
                                    scenario: mission.scenario,
                                    confidence: mission.confidence,
                                    risk_level: mission.risk_level,
                                    recommendation: mission.recommendation,
                                    ai_response: mission.ai_response,
                                    created_at: mission.created_at,
                                    status: mission.status,
                                  }
                                : mission,
                            })
                          }
                          className="rounded-lg bg-blue-900 p-2 text-white transition hover:bg-blue-800"
                        >
                          <Eye size={22} strokeWidth={2.5} />
                        </button>

                        <button
                          title="Download PDF"
                          onClick={() => exportMissionPDF(mission)}
                          className="rounded-lg bg-green-700 p-2 text-white transition hover:bg-green-600"
                        >
                          <FileDown size={22} strokeWidth={2.5} />
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

      </div>
    </DashboardLayout>
  );
}

export default Reports;