import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import useMissions from "../../hooks/useMissions";

const COLORS = {
  Critical: "#DC2626",
  High: "#EA580C",
  Medium: "#EAB308",
  Low: "#22C55E",
};

function RiskDistributionChart() {

  const { missions, loading } = useMissions();
  if (loading) {
    return <p>Loading...</p>;
  }

  const counts = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
  };

  missions.forEach((mission) => {

    if (counts[mission.risk_level] !== undefined) {
      counts[mission.risk_level]++;
    }

  });

  const data = Object.entries(counts)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value,
    }));

  return (

    <div className="bg-surface border-app rounded-2xl border p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">

        🥧 Risk Distribution

      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >

              {data.map((entry) => (

                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name]}
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default RiskDistributionChart;