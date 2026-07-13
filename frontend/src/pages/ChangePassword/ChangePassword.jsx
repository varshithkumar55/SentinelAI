import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import { changePassword } from "../../services/profileService";
import { useAuth } from "../../context/AuthContext";

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
  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();
    setLoading(true);
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

          <Input
            label="Current Password"
            name="current_password"
            type="password"
            value={form.current_password}
            onChange={handleChange}
          />

          <Input
            label="New Password"
            name="new_password"
            type="password"
            value={form.new_password}
            onChange={handleChange}
          />

          <Input
            label="Confirm Password"
            name="confirm_password"
            type="password"
            value={form.confirm_password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-900 py-3 font-semibold text-white hover:bg-blue-800"
          >

            Change Password

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

export default ChangePassword;