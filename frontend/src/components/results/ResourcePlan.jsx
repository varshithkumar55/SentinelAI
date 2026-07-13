function ResourcePlan({ data }) {

  const plan = data.resource_plan || {};

  return (

    <div className="rounded-2xl bg-surface p-6 shadow-sm">

      <h2 className="mb-5 text-2xl font-bold">
        Resource Allocation
      </h2>

      <div className="space-y-4">

        {Object.entries(plan).map(([key, value]) => (

          <div
            key={key}
            className="rounded-xl bg-slate-100 p-4"
          >

            <h3 className="font-semibold capitalize">
              {key.replaceAll("_", " ")}
            </h3>

            <p className="mt-2 text-slate-600 whitespace-pre-wrap">
              {typeof value === "object"
                ? JSON.stringify(value, null, 2)
                : value}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default ResourcePlan;