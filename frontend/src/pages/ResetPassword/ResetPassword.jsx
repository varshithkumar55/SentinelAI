import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import PasswordInput from "../../components/auth/PasswordInput";
import Button from "../../components/ui/Button";
import API from "../../services/api";
import PasswordStrength from "../../components/auth/PasswordStrength";
import PasswordChecklist from "../../components/auth/PasswordChecklist";
import { useAuth } from "../../context/AuthContext";
export default function ResetPassword() {
  console.log("ResetPassword rendered");

  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const isValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
    password === confirmPassword;
  const checks = useMemo(
    () => ({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }),
    [password]
  );

  const score = Object.values(checks).filter(Boolean).length;

  const strength = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Excellent",
  ][score];

  const width = `${score * 20}%`;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid password reset link.");
      return;
    }

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (score < 4) {
      toast.error("Please choose a stronger password.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/reset-password", {
    token,
    password,
    confirm_password: confirmPassword,
      });

      // Log out the current user so Login page doesn't redirect to Dashboard
      logout();

      toast.success(
    response.data.message ||
      "Password reset successfully! Please log in again."
      );

      setTimeout(() => {
    navigate("/login", { replace: true });
      }, 1500);

    } catch (err) {
      toast.error(
    err.response?.data?.detail ||
      "Unable to reset password."
      );
    } finally {
  setLoading(false);
    }
  }
  function Requirement({ ok, children }) {
    return (
      <div
        className={`flex items-center gap-2 text-sm ${
          ok ? "text-green-600" : "text-slate-500"
        }`}
      >
        <span>{ok ? "✓" : "•"}</span>
        <span>{children}</span>
      </div>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a strong new password for your SentinelAI account."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <PasswordInput
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <PasswordStrength password={password} />

        <PasswordChecklist
            password={password}
            confirmPassword={confirmPassword}
        />

        <Button
          type="submit"
          loading={loading}
          disabled={!isValid || loading}
          className="w-full"
      >
          Reset Password
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to Login
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}