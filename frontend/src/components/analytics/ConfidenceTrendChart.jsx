import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { getMissions } from "../../services/storage/missionStorage";

function ConfidenceTrendChart() {

  const missions = [...getMissions()].reverse();

  const data = missions.map((mission, index) => {

    let confidence =
      Number(mission.confidence) || 0;

    if (confidence <= 1) confidence *= 100;

    return {
      mission: index + 1,
      confidence: Math.round(confidence),
    };

  });

  return (

    <div className="bg-surface border-app rounded-2xl border p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">

        📈 AI Confidence Trend

      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="mission"/>

            <YAxis domain={[0,100]}/>

            <Tooltip/>

            <Line
              type="monotone"
              dataKey="confidence"
              stroke="#1E3A8A"
              strokeWidth={3}
              dot={{r:5}}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default ConfidenceTrendChart;