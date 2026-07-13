function AlternativeStrategies({ data }) {
  return (
    <div className="rounded-2xl bg-surface p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Alternative Strategies
      </h2>

      <div className="space-y-6">

        {data.alternative_strategies.map((strategy, index) => (

          <div
            key={index}
            className="rounded-xl border p-5"
          >

            <h3 className="text-xl font-bold">
              {strategy.name || "Unnamed Strategy"}
            </h3>

            <p className="mt-3 text-slate-600">
              {strategy.description || "No description available."}
            </p>

            <div className="mt-5 grid gap-6 md:grid-cols-2">

              <div>

                <h4 className="font-semibold text-green-700">
                  Pros
                </h4>

                <ul className="mt-2 list-disc pl-5">

                  {(strategy.pros || []).map((pro, i) => (
                    <li key={i}>
                      {pro}
                    </li>
                  ))}

                </ul>

              </div>

              <div>

                <h4 className="font-semibold text-red-700">
                  Cons
                </h4>

                <ul className="mt-2 list-disc pl-5">

                  {(strategy.cons || []).map((con, i) => (
                    <li key={i}>
                      {con}
                    </li>
                  ))}

                </ul>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AlternativeStrategies;