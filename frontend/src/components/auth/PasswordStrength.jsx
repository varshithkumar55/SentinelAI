import { useMemo } from "react";

export default function PasswordStrength({ password }) {
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

  const labels = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Excellent",
  ];

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-emerald-600",
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Password Strength</span>

        <span className="font-semibold">
          {labels[score]}
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${colors[score]}`}
          style={{
            width: `${score * 20}%`,
          }}
        />
      </div>
    </div>
  );
}