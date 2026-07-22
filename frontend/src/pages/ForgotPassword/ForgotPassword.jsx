import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import EmailInput from "../../components/auth/EmailInput";
import Button from "../../components/ui/Button";
import { forgotPassword } from "../../services/forgotPasswordService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const res = await forgotPassword(email);

      toast.success(
        res.message ||
          "Password reset link sent successfully."
      );

      setEmail("");

    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
          "Unable to send reset email."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your registered email address and we'll send you a password reset link."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <EmailInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Send Reset Link
        </Button>

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
