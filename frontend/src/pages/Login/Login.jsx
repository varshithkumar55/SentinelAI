import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const {
    login,
    isAuthenticated,
  } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (isAuthenticated) {

      navigate("/dashboard");

    }

  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {

    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required.");
      return;
    }

    try {

      setLoading(true);

      const response = await loginUser({
        email,
        password,
        remember_me: rememberMe,
      });

      login(response, rememberMe);

      toast.success(
        `Welcome back, ${response.user.full_name}!`
      );

      navigate("/dashboard");

    } catch (error) {

      if (error.response?.data?.detail) {

        toast.error(
          error.response.data.detail
        );

      } else {

        toast.error(
          "Unable to connect to server."
        );

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-3xl bg-surface p-10 shadow-lg">

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
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />

          <label className="flex items-center gap-2 text-sm text-slate-600">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(
                  e.target.checked
                )
              }
            />

            Remember Me

          </label>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-xl bg-blue-900 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </div>

      </div>

    </div>

  );
}

export default Login;