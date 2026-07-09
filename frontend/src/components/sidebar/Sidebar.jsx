import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  History,
  Settings,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: ClipboardList, label: "Scenario Builder" },
  { icon: FileText, label: "Reports" },
  { icon: History, label: "History" },
  { icon: Settings, label: "Settings" },
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