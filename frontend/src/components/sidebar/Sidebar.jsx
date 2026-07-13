import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  History,
  Settings,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { BarChart3 } from "lucide-react";
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
    icon: BarChart3,
    label: "Analytics",
    path: "/analytics",
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

  const navigate = useNavigate();
  const location = useLocation();

  return (

    <aside className="h-screen w-72 border-r border-app bg-surface p-6">

      <h1
        onClick={() => navigate("/dashboard")}
        className="mb-10 cursor-pointer text-2xl font-bold text-blue-900"
      >
        SentinelAI
      </h1>

      <nav className="space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (

            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition

              ${
                active
                  ? "bg-blue-900 text-white"
                  : "text-primary hover:bg-blue-50"
              }`}
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