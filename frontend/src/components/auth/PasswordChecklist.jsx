import { CheckCircle, Circle } from "lucide-react";

export default function PasswordChecklist({
  password,
  confirmPassword,
}) {
  const rules = [
    {
      ok: password.length >= 8,
      text: "At least 8 characters",
    },
    {
      ok: /[A-Z]/.test(password),
      text: "One uppercase letter",
    },
    {
      ok: /[a-z]/.test(password),
      text: "One lowercase letter",
    },
    {
      ok: /\d/.test(password),
      text: "One number",
    },
    {
      ok: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
      text: "One special character",
    },
    {
      ok:
        password &&
        confirmPassword &&
        password === confirmPassword,
      text: "Passwords match",
    },
  ];

  return (
    <div className="rounded-2xl border bg-slate-50 p-4 space-y-3">
      {rules.map((rule) => (
        <div
          key={rule.text}
          className={`flex items-center gap-2 text-sm transition-all ${
            rule.ok
              ? "text-green-600"
              : "text-slate-500"
          }`}
        >
          {rule.ok ? (
            <CheckCircle size={18} />
          ) : (
            <Circle size={18} />
          )}

          {rule.text}
        </div>
      ))}
    </div>
  );
}