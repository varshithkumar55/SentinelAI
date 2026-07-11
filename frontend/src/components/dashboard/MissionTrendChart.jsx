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

    const date = new Date(mission.createdAt).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
      }
    );

    grouped[date] = (grouped[date] || 0) + 1;

  });

  const trendData = Object.entries(grouped).map(
    ([day, missions]) => ({
      day,
      missions,
    })
  );

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

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