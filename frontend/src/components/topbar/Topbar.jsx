import { useLocation } from "react-router-dom";

const pageInfo = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome back to SentinelAI",
  },

  "/scenario": {
    title: "Scenario Builder",
    subtitle: "Create and analyze AI-powered mission scenarios.",
  },

  "/results": {
    title: "AI Mission Analysis",
    subtitle: "Review Gemini AI recommendations and insights.",
  },

  "/reports": {
    title: "Mission Reports",
    subtitle: "View all AI-generated mission reports.",
  },

  "/history": {
    title: "Mission History",
    subtitle: "Review previous mission analyses.",
  },

  "/settings": {
    title: "Settings",
    subtitle: "Manage SentinelAI preferences.",
  },
};

function Topbar() {

  const location = useLocation();

  const current =
    pageInfo[location.pathname] || {
      title: "SentinelAI",
      subtitle: "Decision Intelligence Platform",
    };

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      <div>

        <h2 className="text-2xl font-bold">
          {current.title}
        </h2>

        <p className="text-slate-500">
          {current.subtitle}
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="rounded-full bg-green-100 px-4 py-2 text-green-700">
          🟢 AI Online
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-900 text-white font-semibold">
          VK
        </div>

      </div>

    </header>
  );
}

export default Topbar;