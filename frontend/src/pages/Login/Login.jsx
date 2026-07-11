import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-lg">

        <div className="mb-8 flex flex-col items-center">

          <div className="rounded-2xl bg-blue-900 p-4 text-white">
            <ShieldCheck size={40} />
          </div>

          <h1 className="mt-4 text-3xl font-bold">
            SentinelAI
          </h1>

          <p className="mt-2 text-slate-500">
            Decision Intelligence Platform
          </p>

        </div>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border p-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border p-3"
          />

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full rounded-xl bg-blue-900 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;