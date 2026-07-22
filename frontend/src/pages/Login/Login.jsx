import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import EmailInput from "../../components/auth/EmailInput";
import PasswordInput from "../../components/auth/PasswordInput";
import Button from "../../components/ui/Button";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

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

      toast.success(`Welcome back, ${response.user.full_name}!`);

      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to SentinelAI"
    >
      <div className="space-y-5">

        <EmailInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 text-sm text-slate-300">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-600 accent-blue-600"
            />

            Remember Me

          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot Password?
          </Link>

        </div>

        <Button
          onClick={handleLogin}
          loading={loading}
          className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-600 hover:to-cyan-500"
        >
          Login
        </Button>

        <div className="text-center text-sm text-slate-300">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Create Account
          </Link>

        </div>

      </div>
    </AuthLayout>
  );
}

export default Login;