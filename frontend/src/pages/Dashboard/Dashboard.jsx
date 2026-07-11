import DashboardLayout from "../../layouts/DashboardLayout";

import DashboardStats from "../../components/dashboard/DashboardStats";
import MissionTrendChart from "../../components/dashboard/MissionTrendChart";
import RiskPieChart from "../../components/dashboard/RiskPieChart";
import RecentMissions from "../../components/dashboard/RecentMissions";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import MissionHealthCard from "../../components/dashboard/MissionHealthCard";
import LatestRecommendation from "../../components/dashboard/LatestRecommendation";
import QuickActions from "../../components/dashboard/QuickActions";
function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Mission Command Center
          </h1>

          <p className="mt-3 text-slate-600">
            Monitor mission readiness, AI insights and operational intelligence.
          </p>
        </div>
        <DashboardStats />

        <div className="grid gap-6 lg:grid-cols-2">
          <MissionTrendChart />
          <RiskPieChart />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentMissions />
          <ActivityFeed />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">

          <MissionHealthCard />

          <LatestRecommendation />

          <QuickActions />

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;