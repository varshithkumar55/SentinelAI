import { dashboardData } from "../../utils/dashboardData";

function DashboardPreview() {
  return (
    <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            Active Scenario
          </p>

          <h2 className="text-2xl font-bold">
            {dashboardData.scenario}
          </h2>

        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

          🟢 {dashboardData.status}

        </span>

      </div>

      <div className="mb-6">

        <div className="mb-2 flex justify-between text-sm">

          <span>Analysis Progress</span>

          <span>{dashboardData.progress}%</span>

        </div>

        <div className="h-3 rounded-full bg-slate-200">

          <div
            className="h-3 rounded-full bg-blue-900"
            style={{ width: `${dashboardData.progress}%` }}
          />

        </div>

      </div>

      <div className="grid grid-cols-2 gap-4">

        <Metric
          title="Risk Level"
          value={dashboardData.risk}
        />

        <Metric
          title="Confidence"
          value={`${dashboardData.confidence}%`}
        />

        <Metric
          title="Resources"
          value={`${dashboardData.resources}%`}
        />

        <Metric
          title="ETA"
          value={dashboardData.eta}
        />

      </div>

      <div className="mt-6 rounded-xl bg-blue-50 p-4">

        <p className="text-sm text-blue-700">

          Recommended Strategy

        </p>

        <h3 className="mt-2 font-semibold">

          {dashboardData.recommendation}

        </h3>

      </div>

      <div className="mt-6">

        <h3 className="mb-3 font-semibold">

          Recent AI Activity

        </h3>

        <div className="space-y-2">

          {dashboardData.activity.map((item, index) => (

            <div
              key={index}
              className="rounded-lg bg-slate-100 px-3 py-2 text-sm"
            >

              {index === dashboardData.activity.length - 1 ? "⏳" : "✓"} {item}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <p className="text-sm text-slate-500">

        {title}

      </p>

      <h3 className="mt-2 text-2xl font-bold">

        {value}

      </h3>

    </div>
  );
}

export default DashboardPreview;