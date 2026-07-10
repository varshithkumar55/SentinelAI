import { useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

function Results() {

  const { state } = useLocation();

  if (!state) {
    return (
      <DashboardLayout>
        <h2>No Analysis Found</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold">
        AI Analysis Results
      </h1>

      <div className="space-y-6">

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-xl font-bold">
            Summary
          </h2>

          <p className="mt-3">
            {state.summary}
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-xl bg-white p-6 shadow">

            <h3 className="font-semibold">
              Risk Level
            </h3>

            <p className="mt-2 text-2xl">
              {state.risk_level}
            </p>

          </div>

          <div className="rounded-xl bg-white p-6 shadow">

            <h3 className="font-semibold">
              AI Confidence
            </h3>

            <p className="mt-2 text-2xl">
              {state.confidence}%
            </p>

          </div>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-xl font-bold">
            Recommended Strategy
          </h2>

          <p className="mt-3">
            {state.recommended_strategy}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Results;