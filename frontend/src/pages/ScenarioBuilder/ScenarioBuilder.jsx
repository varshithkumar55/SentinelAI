import DashboardLayout from "../../layouts/DashboardLayout";
import ScenarioForm from "../../components/scenario/ScenarioForm";

function ScenarioBuilder() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-slate-900">
          Create AI Scenario
        </h1>

        <p className="mt-2 text-slate-600">
          Define your mission, objectives, constraints, and available
          resources.
        </p>

        <ScenarioForm />
      </div>
    </DashboardLayout>
  );
}

export default ScenarioBuilder;