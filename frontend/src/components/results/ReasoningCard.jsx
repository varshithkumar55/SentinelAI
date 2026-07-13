function ReasoningCard({ data }) {
  return (
    <div className="rounded-2xl bg-surface p-6 shadow-sm">

      <h2 className="mb-5 text-2xl font-bold">
        AI Decision Justification
      </h2>

      <div className="space-y-4">

        {data.reasoning.map((item, index) => (

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

    </div>
  );
}

export default ReasoningCard;