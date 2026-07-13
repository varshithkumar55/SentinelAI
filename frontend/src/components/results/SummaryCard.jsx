function SummaryCard({ data }) {
  return (
    <div className="rounded-2xl bg-surface p-6 shadow-sm">

      <h2 className="mb-4 text-2xl font-bold">
        Executive Summary
      </h2>

      <p className="leading-7 text-slate-700">
        {data.summary}
      </p>

    </div>
  );
}

export default SummaryCard;