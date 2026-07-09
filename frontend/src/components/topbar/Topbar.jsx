function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-slate-500">
          Welcome back to SentinelAI
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-green-100 px-4 py-2 text-green-700">
          🟢 AI Online
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-900 text-white">
          VK
        </div>
      </div>
    </header>
  );
}

export default Topbar;