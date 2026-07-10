import { useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import SummaryCard from "../../components/results/SummaryCard";
import RiskCard from "../../components/results/RiskCard";
import ReasoningCard from "../../components/results/ReasoningCard";
import AlternativeStrategies from "../../components/results/AlternativeStrategies";

function Results() {

  const { state } = useLocation();
  console.log(state);
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

    <div className="space-y-8">

        <SummaryCard data={state} />

        <RiskCard data={state} />

        <ReasoningCard data={state} />

        <AlternativeStrategies data={state} />

    </div>

</DashboardLayout>
  );
}

export default Results;