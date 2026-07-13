import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../theme/ThemeToggle";
import NotificationBell from "../notifications/NotificationBell";
import ProfileDropdown from "../profile/ProfileDropdown";
function Topbar() {

  const location = useLocation();

  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const pageInfo = {
  "/dashboard": {
  title: "Dashboard",
  subtitle: user
    ? `Welcome back, ${user.full_name.split(" ")[0]}!`
    : "Welcome back!",
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
  "/analytics": {
    title: "Analytics",
    subtitle: "Mission intelligence and AI insights.",
  },
  "/change-password": {
  title: "Change Password",
  subtitle: "Update your SentinelAI account password.",
  },
};
  const current =
    pageInfo[location.pathname] || {
      title: "SentinelAI",
      subtitle: "Decision Intelligence Platform",
    };

  const initials = user
    ? user.full_name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "??";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-app bg-surface px-8">

      <div>

        <h2 className="text-2xl font-bold text-primary">
          {current.title}
        </h2>

        <p className="text-secondary">
          {current.subtitle}
        </p>

      </div>

      <div className="flex items-center gap-4">
        <NotificationBell />
        <ThemeToggle />
        <div className="rounded-full bg-green-100 px-4 py-2 text-green-700">
          🟢 AI Online
        </div>

        <ProfileDropdown />

      </div>

    </header>
  );
}

export default Topbar;