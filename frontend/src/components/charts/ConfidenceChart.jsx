import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer
} from "recharts";

function ConfidenceChart({ confidence }) {

  const data = [
    {
      name: "Confidence",
      value: confidence,
      fill: "#2563eb"
    }
  ];

  return (
    <div className="rounded-2xl bg-surface p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        AI Confidence
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
          >

            <RadialBar
              dataKey="value"
            />

            <Legend
              iconSize={10}
            />

          </RadialBarChart>

        </ResponsiveContainer>

      </div>

      <h2 className="text-center text-4xl font-bold">

        {confidence}%

      </h2>

    </div>
  );
}

export default ConfidenceChart;