import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ResourceChart() {

  const data = [
    { name: "Personnel", value: 40 },
    { name: "Vehicles", value: 25 },
    { name: "Equipment", value: 35 }
  ];

  const colors = [
    "#2563eb",
    "#14b8a6",
    "#f97316"
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">

        Resource Allocation

      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={colors[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ResourceChart;