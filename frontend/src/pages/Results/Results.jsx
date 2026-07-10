import { useLocation } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import MetricsGrid from "../../components/results/MetricsGrid";
import SummaryCard from "../../components/results/SummaryCard";
import ReasoningCard from "../../components/results/ReasoningCard";
import KeyRisks from "../../components/results/KeyRisks";
import TimelineCard from "../../components/results/TimelineCard";
import ResourcePlan from "../../components/results/ResourcePlan";
import AlternativeStrategies from "../../components/results/AlternativeStrategies";

function Results() {
  const { state } = useLocation();

  console.log(state);

  if (!state) {
    return (
      <DashboardLayout>
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            No Analysis Found
          </h2>

          <p className="mt-4 text-slate-600">
            Please create a scenario and analyze it first.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">
        AI Mission Analysis
      </h1>

      <div className="space-y-8">

        <MetricsGrid data={state} />

        <SummaryCard data={state} />

        <ReasoningCard data={state} />

        <div className="grid gap-8 xl:grid-cols-2">

          <KeyRisks data={state} />

          <TimelineCard data={state} />

        </div>

        <ResourcePlan data={state} />

        <AlternativeStrategies data={state} />

      </div>
    </DashboardLayout>
  );
}

export default Results;