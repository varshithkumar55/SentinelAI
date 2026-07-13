function TimelineCard({ data }) {

  const timeline = data.timeline || {};

  return (

    <div className="rounded-2xl bg-surface p-6 shadow-sm">

      <h2 className="mb-5 text-2xl font-bold">
        Mission Timeline
      </h2>

      <div className="space-y-5">

        {Object.entries(timeline).map(([phase, value]) => (

          <div
            key={phase}
            className="border-l-4 border-blue-900 pl-4"
          >

            <h3 className="font-bold capitalize">
              {phase.replaceAll("_", " ")}
            </h3>

            <p className="mt-2 text-slate-600">
              {typeof value === "object"
                ? JSON.stringify(value)
                : value}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default TimelineCard;