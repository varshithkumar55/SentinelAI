import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getMissions } from "../../services/storage/missionStorage";

const COLORS = [
  "#1E3A8A",
  "#14B8A6",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
];

function MissionCategoryChart() {

  const missions = getMissions();

  const grouped = {};

  missions.forEach((mission) => {

    const category = mission.mission || "Unknown";

    grouped[category] = (grouped[category] || 0) + 1;

  });

  const data = Object.entries(grouped).map(([name, value]) => ({
  fullName: name,
  name:
    name.length > 18
      ? `${name.substring(0, 18)}...`
      : name,
  value,
}));

  return (

    <div className="bg-surface border-app rounded-2xl border p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">

        📋 Mission Categories

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

              {data.map((entry, index) => (

                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>

            <Tooltip
  formatter={(value) => [value, "Missions"]}
  labelFormatter={(_, payload) =>
    payload?.[0]?.payload?.fullName || ""
  }
/>

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default MissionCategoryChart;