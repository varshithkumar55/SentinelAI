function RiskCard({ data }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">

      <div className="rounded-xl bg-surface p-6 shadow">

        <p className="text-slate-500">
          Risk Level
        </p>

        <h2 className="mt-2 text-3xl font-bold text-red-600">
          {data.risk_level}
        </h2>

      </div>

      <div className="rounded-xl bg-surface p-6 shadow">

        <p className="text-slate-500">
          AI Confidence
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-700">
          {data.confidence}%
        </h2>

      </div>

      <div className="rounded-xl bg-surface p-6 shadow">

        <p className="text-slate-500">
          Recommended Strategy
        </p>

        <h2 className="mt-2 font-bold">
          {data.recommended_strategy}
        </h2>

      </div>

    </div>
  );
}

export default RiskCard;