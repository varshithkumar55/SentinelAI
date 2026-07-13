import { ShieldCheck, Menu } from "lucide-react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

function navigateToSection(sectionId) {
  if (location.pathname === "/") {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  } else {
    navigate(`/#${sectionId}`);
  }
}
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-blue-900 p-2 text-white">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              SentinelAI
            </h1>

            <p className="text-xs text-slate-500">
              Decision Intelligence Platform
            </p>
          </div>
        </Link>

        {/* Menu */}

        <div className="hidden items-center gap-8 md:flex">

          <button
            onClick={() => navigateToSection("features")}
            className="text-slate-600 transition hover:text-blue-900"
          >
            Features
          </button>

          <button
            onClick={() => navigateToSection("technology")}
            className="text-slate-600 transition hover:text-blue-900"
          >
            Technology
          </button>

          <button
            onClick={() => navigateToSection("about")}
            className="text-slate-600 transition hover:text-blue-900"
          >
            About
          </button>

        </div>

        <button
          onClick={() => navigate("/login")}
          className="hidden rounded-lg bg-blue-900 px-5 py-2 font-medium text-white transition hover:bg-blue-800 md:block"
        >
          Login
        </button>

        <button className="md:hidden">
          <Menu />
        </button>

      </div>
    </nav>
  );
}

export default Navbar;