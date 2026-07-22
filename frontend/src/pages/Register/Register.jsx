import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    accept_terms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.first_name.trim()) {
      return toast.error("First name is required.");
    }

    if (!form.last_name.trim()) {
      return toast.error("Last name is required.");
    }

    if (!form.email.trim()) {
      return toast.error("Email is required.");
    }

    if (form.password.length < 8) {
      return toast.error("Password must be at least 8 characters.");
    }

    if (form.password !== form.confirm_password) {
      return toast.error("Passwords do not match.");
    }

    if (!form.accept_terms) {
      return toast.error("Please accept the Terms & Conditions.");
    }

    try {
      setLoading(true);

      await registerUser(form);

      toast.success("Account created successfully.");

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-lg rounded-3xl bg-white/90 backdrop-blur shadow-2xl border border-slate-200 p-10">

        <div className="mb-8 flex flex-col items-center">
          <div className="rounded-2xl bg-blue-900 p-4 text-white">
            <ShieldCheck size={40} />
          </div>

          <h1 className="mt-4 text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-slate-500">
            Join SentinelAI
          </p>
        </div>

        <div className="space-y-4">

          <input
            name="first_name"
            placeholder="First Name"
            className="w-full rounded-xl border p-3"
            value={form.first_name}
            onChange={handleChange}
          />

          <input
            name="last_name"
            placeholder="Last Name"
            className="w-full rounded-xl border p-3"
            value={form.last_name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-xl border p-3"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-xl border p-3"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            className="w-full rounded-xl border p-3"
            value={form.confirm_password}
            onChange={handleChange}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="accept_terms"
              checked={form.accept_terms}
              onChange={handleChange}
            />

            I accept the Terms & Conditions
          </label>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-xl bg-blue-900 py-3 font-semibold text-white hover:bg-blue-800 disabled:bg-slate-400"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-700"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;