import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  History,
  Settings,
} from "lucide-react";

const menu = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: ClipboardList,
    label: "Scenario Builder",
    path: "/scenario",
  },
  {
    icon: FileText,
    label: "Reports",
    path: "/reports",
  },
  {
    icon: History,
    label: "History",
    path: "/history",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className="h-screen w-72 border-r border-slate-200 bg-white p-6">
      <h1 className="mb-10 text-2xl font-bold text-blue-900">
        SentinelAI
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-blue-50"
            >
              <Icon size={20} />

              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;