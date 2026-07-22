import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "../../components/common/Skeleton";
import DashboardLayout from "../../layouts/DashboardLayout";
import EmptyState from "../../components/common/EmptyState";
import {
  getMissions,
  getMission,
  deleteMission,
} from "../../services/missionService";
import { toast } from "react-toastify";
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

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [riskFilter, setRiskFilter] = useState("All");

  const [typeFilter, setTypeFilter] = useState("All");

  const [environmentFilter, setEnvironmentFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

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

    }

    catch (err) {

      console.error(err);

    }

  }

  async function loadMissions() {
  try {
    setLoading(true);

    const data = await getMissions();

    setMissions(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
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

      toast.success("Mission deleted successfully.");

    }

    catch (err) {

      console.error(err);

      toast.error("Failed to delete mission.");

    }

  }

  const environments = [

    "All",

    ...new Set(

      missions
        .map(m => m.environment)
        .filter(Boolean)

    ),

  ];

  const filteredMissions = useMemo(() => {

    let data = [...missions];

    if (search.trim()) {

      data = data.filter(m =>

        m.title
          .toLowerCase()
          .includes(search.toLowerCase())

      );

    }

    if (riskFilter !== "All") {

      data = data.filter(

        m => m.risk_level === riskFilter

      );

    }

    if (typeFilter !== "All") {

      data = data.filter(

        m => m.mission_type === typeFilter

      );

    }

    if (environmentFilter !== "All") {

      data = data.filter(

        m => m.environment === environmentFilter

      );

    }

    switch (sortBy) {

      case "Oldest":

        data.sort(

          (a,b)=>

          new Date(a.created_at)-

          new Date(b.created_at)

        );

        break;

      case "Highest Confidence":

        data.sort(

          (a,b)=>

          b.confidence-a.confidence

        );

        break;

      case "Lowest Confidence":

        data.sort(

          (a,b)=>

          a.confidence-b.confidence

        );

        break;

      default:

        data.sort(

          (a,b)=>

          new Date(b.created_at)-

          new Date(a.created_at)

        );

    }

    return data;

  }, [

    missions,

    search,

    riskFilter,

    typeFilter,

    environmentFilter,

    sortBy,

  ]);

  return (

  <DashboardLayout>

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold">

          Mission History

        </h1>

        <p className="mt-2 text-secondary">

          Review previous mission analyses.

        </p>

      </div>

      {/* Search & Filters */}

      <div className="grid gap-4 rounded-2xl border border-app bg-surface p-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">

        <input
          type="text"
          placeholder="🔍 Search Mission..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
        />

        <select
          value={riskFilter}
          onChange={(e)=>setRiskFilter(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >

          <option>All</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>

        </select>

        <select
          value={typeFilter}
          onChange={(e)=>setTypeFilter(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >

          <option>All</option>
          <option>Defense</option>
          <option>Reconnaissance</option>
          <option>Rescue</option>
          <option>Surveillance</option>

        </select>

        <select
          value={environmentFilter}
          onChange={(e)=>setEnvironmentFilter(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >

          {environments.map(env=>(

            <option
              key={env}
              value={env}
            >

              {env}

            </option>

          ))}

        </select>

        <select
          value={sortBy}
          onChange={(e)=>setSortBy(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >

          <option>Newest</option>
          <option>Oldest</option>
          <option>Highest Confidence</option>
          <option>Lowest Confidence</option>

        </select>

      </div>

      <div className="text-sm text-slate-500">

        Showing <b>{filteredMissions.length}</b> of{" "}
        <b>{missions.length}</b> missions

      </div>

      {filteredMissions.length===0 ? (

        <EmptyState
          icon="🛰️"
          title="No Missions Found"
          description="Try changing your search or filters."
        />

      ) : (

        filteredMissions.map((mission)=>(

          <div
            key={mission.id}
            onClick={()=>openMission(mission.id)}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm transition hover:shadow-lg"
          >

            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-2xl font-bold">

                  {mission.title}

                </h2>

                <div className="mt-2 flex flex-wrap gap-2">

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">

                    {mission.mission_type}

                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">

                    {mission.environment}

                  </span>

                </div>

                <p className="mt-4 text-sm text-slate-500">

                  {new Date(
                    mission.created_at
                  ).toLocaleString()}

                </p>

              </div>

              <div className="text-right">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeColor(
                    mission.risk_level
                  )}`}
                >

                  {mission.risk_level}

                </span>

                <p className="mt-4 text-2xl font-bold">

                  {mission.confidence}%

                </p>

                <button
                  onClick={(e)=>{

                    e.stopPropagation();

                    handleDelete(mission.id);

                  }}
                  className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
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