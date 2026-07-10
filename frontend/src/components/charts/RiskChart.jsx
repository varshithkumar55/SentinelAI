import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function RiskChart({ risks }) {

  const data = (risks || []).slice(0, 5).map((risk) => ({
    name: risk.length > 18 ? risk.substring(0, 18) + "..." : risk,
    value: Math.floor(Math.random() * 40) + 60
  }));

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">

        Risk Severity

      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" fill="#dc2626" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default RiskChart;