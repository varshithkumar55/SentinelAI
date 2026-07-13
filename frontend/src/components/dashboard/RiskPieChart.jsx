import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { getMissions } from "../../services/storage/missionStorage";

function RiskPieChart() {
  const missions = getMissions();

  const counts = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
  };

  missions.forEach((mission) => {
    const level = mission.risk_level || "Low";

    if (counts[level] !== undefined) {
      counts[level]++;
    }
  });

  const data = [
    { name: "Critical", value: counts.Critical, color: "#DC2626" },
    { name: "High", value: counts.High, color: "#EA580C" },
    { name: "Medium", value: counts.Medium, color: "#FACC15" },
    { name: "Low", value: counts.Low, color: "#16A34A" },
  ].filter(item => item.value > 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Risk Distribution
      </h2>

      <ResponsiveContainer width="100%" height={280}>

        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >

          <XAxis type="number" allowDecimals={false} />

          <YAxis
            type="category"
            dataKey="name"
            width={80}
          />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[0, 8, 8, 0]}
          >

            {data.map((entry) => (

              <Cell
                key={entry.name}
                fill={entry.color}
              />

            ))}

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default RiskPieChart;