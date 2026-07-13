import DashboardLayout from "../../layouts/DashboardLayout";

import AnalyticsStats from "../../components/analytics/AnalyticsStats";
import ConfidenceTrendChart from "../../components/analytics/ConfidenceTrendChart";
import RiskDistributionChart from "../../components/analytics/RiskDistributionChart";
import EnvironmentAnalysisChart from "../../components/analytics/EnvironmentAnalysisChart";
import MissionCategoryChart from "../../components/analytics/MissionCategoryChart";
import IntelligenceSummary from "../../components/analytics/IntelligenceSummary";

function Analytics() {

  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold">
            Analytics
          </h1>

          <p className="mt-2 text-secondary">
            AI-powered mission insights and operational intelligence.
          </p>

        </div>

        {/* KPI Cards */}

        <AnalyticsStats />

        {/* Row 1 */}

        <div className="grid gap-8 xl:grid-cols-2">

          <ConfidenceTrendChart />

          <RiskDistributionChart />

        </div>

        {/* Row 2 */}

        <div className="grid gap-8 xl:grid-cols-2">

          <EnvironmentAnalysisChart />

          <MissionCategoryChart />

        </div>

        {/* AI Intelligence Summary */}

        <IntelligenceSummary />

      </div>

    </DashboardLayout>

  );

}

export default Analytics;