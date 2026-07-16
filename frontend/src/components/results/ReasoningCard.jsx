function ReasoningCard({ data }) {

  const reasoning =
    data.reasoning ||
    (data.recommendation
      ? [data.recommendation]
      : []);

  return (

    <div className="rounded-2xl bg-surface p-6 shadow-sm">

      <h2 className="mb-5 text-2xl font-bold">

        AI Decision Justification

      </h2>

      {reasoning.length === 0 ? (

        <p className="text-slate-500">

          No reasoning available.

        </p>

      ) : (

        <div className="space-y-4">

          {reasoning.map((item, index) => (

            <div
              key={index}
              className="flex gap-3"
            >

              <span className="text-green-600">

                ✓

              </span>

              <p>{item}</p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default ReasoningCard;