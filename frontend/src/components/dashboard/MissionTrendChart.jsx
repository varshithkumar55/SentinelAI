import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getMissions } from "../../services/storage/missionStorage";

function MissionTrendChart() {

  const missions = getMissions();

  // Count missions by date
  const grouped = {};

missions.forEach((mission) => {

  const key = mission.createdAt.split("T")[0];

  if (!grouped[key]) {
    grouped[key] = 0;
  }

  grouped[key]++;

});

const trendData = Object.keys(grouped)
  .sort()
  .map((date) => ({

    day: new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
      }
    ),

    missions: grouped[date],

  }));

  return (

    <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">

        Mission Trend

      </h2>

      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={trendData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="missions"
              stroke="#1E3A8A"
              strokeWidth={3}
              dot={{ r: 5 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default MissionTrendChart;