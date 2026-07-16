import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ResourceChart() {

  const data = [
    { name: "Personnel", value: 40 },
    { name: "Equipment", value: 30 },
    { name: "Vehicles", value: 20 },
    { name: "Budget", value: 10 },
  ];

  return (
    <div className="rounded-2xl bg-surface p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Resource Distribution
      </h2>

      <div style={{ width: "100%", height: 350 }}>

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={[
                    "#2563eb",
                    "#16a34a",
                    "#f97316",
                    "#9333ea",
                  ][index]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ResourceChart;