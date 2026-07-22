function EmptyState({
  icon = "📂",
  title = "No Data",
  description = "Nothing to display yet.",
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-surface p-12 text-center shadow-sm">
      <div className="text-6xl">{icon}</div>

      <h2 className="mt-5 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;