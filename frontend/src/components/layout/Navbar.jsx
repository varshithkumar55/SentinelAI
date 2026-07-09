import { ShieldCheck, Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
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
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-slate-600 hover:text-blue-900">
            Features
          </a>

          <a href="#" className="text-slate-600 hover:text-blue-900">
            Technology
          </a>

          <a href="#" className="text-slate-600 hover:text-blue-900">
            About
          </a>
        </div>

        {/* Login Button */}
        <button className="hidden rounded-lg bg-blue-900 px-5 py-2 font-medium text-white transition hover:bg-blue-800 md:block">
          Login
        </button>

        {/* Mobile */}
        <button className="md:hidden">
          <Menu />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;