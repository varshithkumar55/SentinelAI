import { ShieldCheck } from "lucide-react";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute h-96 w-96 rounded-full bg-blue-600/20 blur-3xl top-0 left-0" />
      <div className="absolute h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl bottom-0 right-0" />

      <div className="relative w-full max-w-lg">

        <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-2xl p-10">

          <div className="flex flex-col items-center mb-10">

            <div className="rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-5 text-white shadow-xl transition-transform duration-300 hover:scale-105">

              <ShieldCheck size={42} />

            </div>

            <h1 className="mt-5 text-3xl font-extrabold text-slate-900">

              SentinelAI

            </h1>

            <p className="mt-2 text-xl font-semibold text-slate-700">

              {title}

            </p>

            <p className="mt-2 text-center text-slate-500 text-sm leading-6">

              {subtitle}

            </p>

          </div>

          {children}

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;