import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import { changePassword } from "../../services/profileService";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "../../components/common/PasswordInput";
function ChangePassword() {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  function getPasswordStrength(password) {

    if (!password) {

        return {
      label: "",
      color: "",
        };

    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {

        return {
      label: "Weak",
      color: "bg-red-500",
        };

    }

    if (score <= 4) {

        return {
      label: "Medium",
      color: "bg-yellow-500",
        };

    }

    return {
    label: "Strong",
    color: "bg-green-500",
    };

    }
  const strength = getPasswordStrength(
  form.new_password
);
  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();
    if (
        !form.current_password ||
        !form.new_password ||
        !form.confirm_password
        ) {

        toast.error("Please fill in all fields.");

        return;

        }

        if (form.new_password !== form.confirm_password) {

        toast.error("Passwords do not match.");

        return;

        }

        if (form.current_password === form.new_password) {

        toast.error(
            "New password must be different from your current password."
        );

        return;

    }
    try {

      await changePassword(form);
      setLoading(false);
      toast.success(
        "Password changed successfully. Please login again."
      );

      logout();

      navigate("/");

    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.detail ||
        "Unable to change password."
      );

    }

  }

  return (

    <DashboardLayout>

      <div className="mx-auto max-w-xl rounded-2xl border border-app bg-surface p-8 shadow-sm">

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <PasswordInput
            label="Current Password"
            name="current_password"
            value={form.current_password}
            onChange={handleChange}
            show={showCurrent}
            setShow={setShowCurrent}
            />

          <PasswordInput
            label="New Password"
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
            show={showNew}
            setShow={setShowNew}
            />
          {form.new_password && (

          <div className="mt-3">

            <div className="flex items-center justify-between">

            <span className="text-sm text-slate-500">
                Password Strength
            </span>

            <span className="text-sm font-semibold">
                {strength.label}
            </span>

            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">

            <div
                className={`h-full ${strength.color} transition-all duration-300`}
                style={{
                width:
                    strength.label === "Weak"
                    ? "33%"
                    : strength.label === "Medium"
                    ? "66%"
                    : "100%",
                }}
            />

            </div>

        </div>

        )}
        {form.new_password && (

            <div className="rounded-xl border border-app bg-slate-50 p-4">

                <h3 className="mb-3 font-semibold">

                Password Requirements

                </h3>

                <ul className="space-y-2 text-sm">

                <Requirement
                    ok={form.new_password.length >= 8}
                    text="At least 8 characters"
                />

                <Requirement
                    ok={/[A-Z]/.test(form.new_password)}
                    text="One uppercase letter"
                />

                <Requirement
                    ok={/[a-z]/.test(form.new_password)}
                    text="One lowercase letter"
                />

                <Requirement
                    ok={/\d/.test(form.new_password)}
                    text="One number"
                />

                <Requirement
                    ok={/[^A-Za-z0-9]/.test(form.new_password)}
                    text="One special character"
                />

                </ul>

            </div>

            )}
          <PasswordInput
            label="Confirm Password"
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            show={showConfirm}
            setShow={setShowConfirm}
            />
          {form.confirm_password && (

            <p
                className={`text-sm font-medium ${
                form.new_password === form.confirm_password
                    ? "text-green-600"
                    : "text-red-600"
                }`}
            >

                {form.new_password === form.confirm_password
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}

            </p>

            )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-900 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >

            {loading
                ? "Updating Password..."
                : "Change Password"
            }

            </button>

        </form>

      </div>

    </DashboardLayout>

  );

}

function Input({ label, ...props }) {

  return (

    <div>

      <label className="mb-2 block font-medium">

        {label}

      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-slate-300 p-3"
      />

    </div>

  );

}
function Requirement({
  ok,
  text,
}) {

  return (

    <li
      className={
        ok
          ? "text-green-600"
          : "text-slate-500"
      }
    >

      {ok ? "✓" : "○"} {text}

    </li>

  );

}
export default ChangePassword;