import { useNavigate } from "react-router-dom";

function QuickActions() {

  const navigate = useNavigate();

  return (

    <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

      <h2 className="text-xl font-bold">

        Quick Actions

      </h2>

      <div className="mt-6 flex flex-col gap-4">
        <button
          onClick={() => navigate("/scenario")}
          className="w-full rounded-xl bg-blue-900 px-5 py-3 text-white hover:bg-blue-800"
        >
          + New Mission
        </button>

        <button
          onClick={() => navigate("/reports")}
          className="w-full rounded-xl border border-blue-900 px-5 py-3 text-blue-900 hover:bg-blue-50"
        >
          View Reports
        </button>

      </div>

    </div>

  );

}

export default QuickActions;