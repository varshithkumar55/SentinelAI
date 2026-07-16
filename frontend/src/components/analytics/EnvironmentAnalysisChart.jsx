import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import useMissions from "../../hooks/useMissions";

function EnvironmentAnalysisChart() {

  const { missions, loading } = useMissions();
  if (loading) {
    return <p>Loading...</p>;
  }

  const grouped = {};

  missions.forEach((mission) => {

    const env = mission.environment;

    if (!env || env === "Unknown") return;

    grouped[env] = (grouped[env] || 0) + 1;

  });

  const data = Object.entries(grouped).map(([environment, missions]) => ({
    environment,
    missions,
  }));

  return (

    <div className="bg-surface border-app rounded-2xl border p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">

        🌍 Environment Analysis

      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="environment"/>

            <YAxis allowDecimals={false}/>

            <Tooltip/>

            <Bar
              dataKey="missions"
              fill="#1E3A8A"
              radius={[8,8,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default EnvironmentAnalysisChart;